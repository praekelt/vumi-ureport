var _ = require('underscore');
var assert = require('assert');

var vumigo = require('vumigo_v02');
var AppTester = vumigo.AppTester;
var VumiUReportApp = vumi_ureport.app.VumiUReportApp;

var fixtures = require('./fixtures');


describe("app", function() {
    describe("VumiUReportApp", function() {
        var app;
        var tester;
        
        function add_fixture(k) {
            var f = fixtures()[k];
            f.request.body = JSON.stringify(f.request.body);
            f.response.body = JSON.stringify(f.response.body);
            f.request.content_type = 'application/json; charset=utf-8';
            tester.api.add_http_fixture(f);
        }

        beforeEach(function() {
            app = new VumiUReportApp();
            tester = new AppTester(app);

            tester
                .setup.config({
                    name: 'test_ureport',
                    ureport_api_url: 'http://example.com',
                    ureport_backend: 'vumi_go_test'
                })
                .setup.user({addr: 'user_default'})
                .setup(function() {
                    _(fixtures()).keys().forEach(add_fixture);
                });
        });

        describe("when the session starts", function() {
            describe("if the user is not found", function() {
                it("should show the registration poll", function() {
                    return tester
                        .setup.user({addr: 'user_not_found'})
                        .start()
                        .check.reply("How old are you?")
                        .check.user.state('states:register')
                        .run();
                });
            });

            describe("if the user is not registered", function() {
                it("should show the registration poll", function() {
                    return tester
                        .setup.user({addr: 'user_not_registered'})
                        .start()
                        .check.reply("How old are you?")
                        .check.user.state('states:register')
                        .run();
                });
            });

            describe("if the user is registered", function() {
                it("should show the main menu", function() {
                    return tester
                        .start()
                        .check.reply([
                            "Ureport (Speak out for your community)",
                            "1. This week's question",
                            "2. Poll results",
                            "3. Send report"
                        ].join('\n'))
                        .check.user.state('states:main_menu')
                        .run();
                });

                it("should reset the user's language", function() {
                    return tester
                        .setup.user({addr: 'user_sw'})
                        .start()
                        .check.user.properties({lang: 'sw'})
                        .run();
                });
            });
        });

        describe("when the user is on a registration poll", function() {
            it("should send the user's response to ureport", function() {
                return tester
                    .setup.user.state('states:register')
                    .setup.user.addr('user_on_reg_poll_1')
                    .input('21')
                    .check(function(api, im) {
                        var req = _(api.http_requests).findWhere({
                            url: [
                                'http://example.com/ureporters/vumi_go_test/',
                                'user_on_reg_poll_1/poll/reg_poll_1/responses/'
                            ].join('')
                        });

                        assert.equal(JSON.parse(req.body).response, '21');
                    })
                    .run();
            });

            describe("if it is not the last registration poll", function() {
                it("should show the next registration poll", function() {
                    return tester
                        .setup.user.state('states:register')
                        .setup.user.addr('user_on_reg_poll_1')
                        .input("21")
                        .check.reply("How old are you?")
                        .check.user.state('states:register')
                        .run();
                });
            });

            describe("if it is the last registration poll", function() {
                it("should show the main menu", function() {
                    return tester
                        .setup.user.state('states:register')
                        .setup.user.addr('user_on_reg_poll_2')
                        .input("I don't know that")
                        .check.reply([
                            "Ureport (Speak out for your community)",
                            "1. This week's question",
                            "2. Poll results",
                            "3. Send report"
                        ].join('\n'))
                        .check.user.state('states:main_menu')
                        .run();
                });
            });
        });

        describe("when the user is on the main menu", function() {
            describe("if the user chooses to take the poll", function() {
                it("should show the user the current poll", function() {
                    return tester
                        .setup.user.state('states:main_menu')
                        .input('1')
                        .check.reply("What is your quest?")
                        .check.user.state('states:poll:question')
                        .run();
                });
            });

            describe("if the user chooses to view the results", function() {
                it("should show the user the current poll topics", function() {
                    return tester
                        .setup.user.state('states:main_menu')
                        .input('2')
                        .check.reply([
                            "Choose poll:",
                            "1. Poll 1",
                            "2. Poll 2"
                        ].join('\n'))
                        .check.user.state('states:results:choose')
                        .run();
                });
            });

            describe("if the user chooses to submit a report", function() {
                it("should ask the user to enter their report", function() {
                    return tester
                        .setup.user.state('states:main_menu')
                        .input('3')
                        .check.reply("Enter message:")
                        .check.user.state('states:reports:submit')
                        .run();
                });
            });
        });

        describe("when the user is asked the current poll", function() {
            it("should send the user's response to ureport", function() {
                return tester
                    .setup.user.addr('user_on_poll_1')
                    .setup.user.state('states:poll:question')
                    .input('To seek the Holy Grail')
                    .check(function(api) {
                        var req = _(api.http_requests).findWhere({
                            url: [
                                'http://example.com/ureporters/vumi_go_test/',
                                'user_on_poll_1/poll/poll_1/responses/'
                            ].join('')
                        });

                        assert.equal(
                            JSON.parse(req.body).response,
                            'To seek the Holy Grail');
                    })
                    .run();
            });

            it("should show the user ureport's response", function() {
                return tester
                    .setup.user.addr('user_on_poll_1')
                    .setup.user.state('states:poll:question')
                    .input('To seek the Holy Grail')
                    .check.reply([
                        "Thank you for answering poll 1. " +
                        "View the results so far?",
                        "1. Yes",
                        "2. No"
                    ].join('\n'))
                    .run();
            });

            it("should allow falling back to a default response", function() {
                return tester
                    .setup.user.addr('user_on_poll_2')
                    .setup.user.state('states:poll:question')
                    .input('Blue')
                    .check.reply([
                        "Thank you for your response. " +
                        "View the results so far?",
                        "1. Yes",
                        "2. No"
                    ].join('\n'))
                    .run();
            });
        });

        describe("when the user has submitted a poll response", function() {
            describe("if they choose to view the poll results", function() {
                it("should show them results for the poll they are on",
                function() {
                    return tester
                        .setup.user.state('states:poll:after_question')
                        .setup.user.state.creator_opts({poll_id: 'poll_1'})
                        .input('1')
                        .check.reply([
                            "Total responses: 3756",
                            "Choice 1: 1234",
                            "Choice 2: 2522"
                        ].join('\n'))
                        .check.user.state('states:results:view')
                        .run();
                });
            });

            describe("if they to not view the poll results", function() {
                it("should show them the end-of-session response", function() {
                    return tester
                        .setup.user.state('states:poll:after_question')
                        .setup.user.state.creator_opts({poll_id: 'poll_1'})
                        .input('2')
                        .check.reply("Thank you for using Ureport.")
                        .check.user.state('states:end')
                        .run();
                });
            });
        });

        describe("when the user is asked to choose a topic", function() {
            it("should show them the results for the chosen topic",
            function() {
                return tester
                    .setup.user.state('states:results:choose')
                    .input('1')
                    .check.reply([
                        "Total responses: 3756",
                        "Choice 1: 1234",
                        "Choice 2: 2522"
                    ].join('\n'))
                    .check.user.state('states:results:view')
                    .run();
            });
        });

        describe("when the user is viewing a poll's results", function() {
            it("should start at the beginning on the next session", function() {
                return tester
                    .setup.user.state('states:results:view')
                    .setup.user.state.creator_opts({poll_id: 'poll_1'})
                    .start()
                    .check.user.state('states:main_menu')
                    .run();
            });
        });

        describe("when the user is asked to submit a report", function() {
            it("should send the user's input to ureport", function() {
                return tester
                    .setup.user.state('states:reports:submit')
                    .input("report text")
                    .check(function(api) {
                        var req = _(api.http_requests).findWhere({
                            url: [
                                'http://example.com/ureporters/vumi_go_test/',
                                'user_default/reports/'
                            ].join('')
                        });

                        assert.equal(
                            JSON.parse(req.body).report,
                            "report text");
                    })
                    .run();
            });

            it("should show the user ureport's response", function() {
                return tester
                    .setup.user.state('states:reports:submit')
                    .input("report text")
                    .check.reply("Thank you for your report.")
                    .check.user.state('states:reports:after_submit')
                    .run();
            });

            it("should allow falling back to a default response", function() {
                return tester
                    .setup.user.addr('user_got_no_report_response')
                    .setup.user.state('states:reports:submit')
                    .input("report text")
                    .check.reply("Thank you for your msg.")
                    .check.user.state('states:reports:after_submit')
                    .run();
            });
        });

        describe("when the user has submitted a report", function() {
            it("should start at the beginning on the next session", function() {
                return tester
                    .setup.user.state('states:reports:after_submit')
                    .input()
                    .check.user.state('states:main_menu')
                    .run();
            });
        });

        describe("when the user at the end of the session screen", function() {
            it("should start at the beginning on the next session", function() {
                return tester
                    .setup.user.state('states:end')
                    .input()
                    .check.user.state('states:main_menu')
                    .run();
            });
        });
    });
});
