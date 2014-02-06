var assert = require("assert");

var vumigo = require('vumigo_v02');
var test_utils = vumigo.test_utils;
var utils = vumigo.utils;

var UReportApi = vumi_ureport.api.UReportApi;
var DummyUReportApi = vumi_ureport.dummy.DummyUReportApi;


describe("api", function() {
    describe("UReportApi", function() {
        var api;
        var ureport;

        beforeEach(function() {
            return test_utils.make_im().then(function(im) {
                api = new DummyUReportApi(im.api, 'http://example.com');
                ureport = new UReportApi(
                    im,
                    'http://example.com',
                    'vumi_go_sms');
            });
        });

        describe(".ureporters.get", function() {
            it("should return the ureporter's data", function() {
                api.add_fixture({
                    request: {
                        method: 'GET',
                        url: 'ureporters/vumi_go_sms/+256775551122'
                    },
                    response: {
                        data: {
                            success: true,
                            user: {
                                registered: true,
                                language: 'sw'
                            }
                        }
                    }
                });

                return ureport
                    .ureporters('+256775551122')
                    .get()
                    .then(function(user) {
                        assert.deepEqual(user, {
                            registered: true,
                            language: 'sw'
                        });
                    });
            });
        });

        describe(".ureporters.is_registered", function() {
            it("should return true if the ureporter is registered",
            function() {
                api.add_fixture({
                    request: {
                        method: 'GET',
                        url: 'ureporters/vumi_go_sms/+256775551122'
                    },
                    response: {
                        data: {
                            success: true,
                            user: {
                                registered: true,
                                language: 'sw'
                            }
                        }
                    }
                });

                return ureport
                    .ureporters('+256775551122')
                    .is_registered()
                    .then(function(registered) {
                        assert(registered);
                    });
            });

            it("should return false if the ureporter is not registered",
            function() {
                api.add_fixture({
                    request: {
                        method: 'GET',
                        url: 'ureporters/vumi_go_sms/+256775551122'
                    },
                    response: {
                        data: {
                            success: true,
                            user: {
                                registered: false,
                                language: 'sw'
                            }
                        }
                    }
                });

                return ureport
                    .ureporters('+256775551122')
                    .is_registered()
                    .then(function(registered) {
                        assert(!registered);
                    });
            });

            it("should return false if the ureporter is not found",
            function() {
                api.add_fixture({
                    request: {
                        method: 'GET',
                        url: 'ureporters/vumi_go_sms/+256775551122'
                    },
                    response: {code: 404}
                });

                return ureport
                    .ureporters('+256775551122')
                    .is_registered()
                    .then(function(registered) {
                        assert(!registered);
                    });
            });
        });

        describe(".ureporters.polls.current", function() {
            it("should the return current poll", function() {
                api.add_fixture({
                    request: {
                        method: 'GET',
                        url: [
                            'ureporters/vumi_go_sms/+256775551122',
                            'polls/current'
                        ].join('/')
                    },
                    response: {
                        data: {
                            success: true,
                            poll: {id: '1234'}
                        }
                    }
                });

                return ureport
                    .ureporters('+256775551122')
                    .polls.current()
                    .then(function(poll) {
                        assert.deepEqual(poll, {id: '1234'});
                    });
            });
        });

        describe(".ureporters.polls.topics", function() {
            it("should the return current topics", function() {
                api.add_fixture({
                    request: {
                        method: 'GET',
                        url: [
                            'ureporters/vumi_go_sms/+256775551122',
                            'polls/topics'
                        ].join('/')
                    },
                    response: {
                        data: {
                            success: true,
                            poll_topics: [{poll_id: "poll-1234"}]
                        }
                    }
                });

                return ureport
                    .ureporters('+256775551122')
                    .polls.topics()
                    .then(function(topics) {
                        assert.deepEqual(topics, [{poll_id: "poll-1234"}]);
                    });
            });
        });

        describe(".ureporters.poll.responses.submit", function() {
            beforeEach(function() {
                api.add_fixture({
                    request: {
                        method: 'POST',
                        url: [
                            'ureporters/vumi_go_sms/+256775551122',
                            'poll/1234/responses/'
                        ].join('/'),
                        data: {response: 'response text'}
                    },
                    response: {
                        data: {
                            success: true,
                            result: {
                                accepted: true,
                                response: "Thank you for answering the poll."
                            }
                        }
                    }
                });
            });

            it("should submit a poll response", function() {
                return ureport
                    .ureporters('+256775551122')
                    .poll('1234')
                    .responses.submit('response text')
                    .then(function() {
                        var request = api.last_request();

                        assert.deepEqual(
                            request.data,
                            {response: 'response text'});
                    });
            });

            it("should return the submission result", function() {
                return ureport
                    .ureporters('+256775551122')
                    .poll('1234')
                    .responses.submit('response text')
                    .then(function(result) {
                        assert.deepEqual(result, {
                            accepted: true,
                            response: "Thank you for answering the poll."
                        });
                    });
            });
        });

        describe(".ureporters.poll.summary", function() {
            it("should return the poll summary", function() {
                api.add_fixture({
                    request: {
                        method: 'GET',
                        url: [
                            'ureporters/vumi_go_sms/+256775551122',
                            'poll/1234/summary'
                        ].join('/')
                    },
                    response: {
                        data: {
                            success: true,
                            poll_result: {total_responses: 3756}
                        }
                    }
                });

                return ureport
                    .ureporters('+256775551122')
                    .poll('1234')
                    .summary()
                    .then(function(summary) {
                        assert.deepEqual(summary, {total_responses: 3756});
                    });
            });
        });

        describe(".ureporters.reports.submit", function() {
            beforeEach(function() {
                api.add_fixture({
                    request: {
                        method: 'POST',
                        url: [
                            'ureporters/vumi_go_sms/+256775551122',
                            'reports/'
                        ].join('/'),
                        data: {report: 'report text'}
                    },
                    response: {
                        data: {
                            success: true,
                            result: {
                                accepted: true,
                                response: "Thank you for your report."
                            }
                        }
                    }
                });
            });

            it("should submit a report", function() {
                return ureport
                    .ureporters('+256775551122')
                    .reports.submit('report text')
                    .then(function() {
                        var request = api.last_request();

                        assert.deepEqual(
                            request.data,
                            {report: 'report text'});
                    });
            });

            it("should return the submission result", function() {
                return ureport
                    .ureporters('+256775551122')
                    .reports.submit('report text')
                    .then(function(result) {
                        assert.deepEqual(result, {
                            accepted: true,
                            response: "Thank you for your report."
                        });
                    });
            });
        });
    });
});
