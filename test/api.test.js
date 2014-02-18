var assert = require('assert');

var vumigo = require('vumigo_v02');
var DummyApi = vumigo.DummyApi;
var test_utils = vumigo.test_utils;
var utils = vumigo.utils;

var UReportApi = vumi_ureport.api.UReportApi;


describe("api", function() {
    describe("UReportApi", function() {
        var api;
        var ureport;

        beforeEach(function() {
            api = new DummyApi({http: {encoding: 'json'}});

            return test_utils.make_im({api: api}).then(function(im) {
                ureport = new UReportApi(
                    im,
                    'http://example.com',
                    'vumi_go_sms');
            });
        });

        it("should support basic auth", function() {
            return test_utils.make_im({api: api}).then(function(im) {
                var ureport = new UReportApi(
                    im,
                    'http://example.com',
                    'vumi_go_sms', {
                        auth: {
                            username: 'root',
                            password: 'toor'
                        }
                    });

                api.http.fixtures.add({
                    request: {
                        method: 'GET',
                        url: [
                            'http://example.com',
                            'ureporters/vumi_go_sms/+256775551122'
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
                    .get()
                    .then(function() {
                        var request = api.http.requests[0];
                        assert.deepEqual(
                            request.headers.Authorization,
                            [utils.basic_auth('root', 'toor')]);
                    });
            });
        });

        describe(".ureporters.get", function() {
            it("should return the ureporter's data", function() {
                api.http.fixtures.add({
                    request: {
                        method: 'GET',
                        url: [
                            'http://example.com',
                            'ureporters/vumi_go_sms/+256775551122'
                        ].join('/')
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

            it("should return null if the ureporter is not found", function() {
                api.http.fixtures.add({
                    request: {
                        method: 'GET',
                        url: [
                            'http://example.com',
                            'ureporters/vumi_go_sms/+256775551122'
                        ].join('/')
                    },
                    response: {code: 404}
                });

                return ureport
                    .ureporters('+256775551122')
                    .get()
                    .then(function(user) {
                        assert.strictEqual(user, null);
                    });
            });
        });

        describe(".ureporters.polls.current", function() {
            it("should the return current poll", function() {
                api.http.fixtures.add({
                    request: {
                        method: 'GET',
                        url: [
                            'http://example.com',
                            'ureporters/vumi_go_sms/+256775551122',
                            'polls/current'
                        ].join('/')
                    },
                    response: {
                        data: {
                            success: true,
                            poll: {
                                id: '1234',
                                type: 'text',
                                question: 'What is your name?'
                            }
                        }
                    }
                });

                return ureport
                    .ureporters('+256775551122')
                    .polls.current()
                    .then(function(poll) {
                        assert.deepEqual(poll, {
                            id: '1234',
                            type: 'text',
                            question: 'What is your name?'
                        });
                    });
            });

            describe("if a none poll is given back", function() {
                it("should get the next poll until the given limit is hit",
                function() {
                    api.http.fixtures.add({
                        request: {
                            method: 'GET',
                            url: [
                                'http://example.com',
                                'ureporters/vumi_go_sms/+256775551122',
                                'polls/current'
                            ].join('/')
                        },
                        responses: [{
                            data: {
                                success: true,
                                poll: {
                                    id: null,
                                    type: 'none',
                                    question: 'Hello!'
                                }
                            }
                        }, {
                            data: {
                                success: true,
                                poll: {
                                    id: null,
                                    type: 'none',
                                    question: 'Welcome!'
                                }
                            }
                        }, {
                            data: {
                                success: true,
                                poll: {
                                    id: '1234',
                                    type: 'text',
                                    question: 'What is your name?'
                                }
                            }
                        }]
                    });

                    return ureport
                        .ureporters('+256775551122')
                        .polls.current({nones: {limit: 2}})
                        .then(function(poll) {
                            assert.deepEqual(poll, {
                                id: '1234',
                                type: 'text',
                                question: 'What is your name?'
                            });
                        });
                });

                it("should not get the next poll if asked to use nones",
                function() {
                    api.http.fixtures.add({
                        request: {
                            method: 'GET',
                            url: [
                                'http://example.com',
                                'ureporters/vumi_go_sms/+256775551122',
                                'polls/current'
                            ].join('/')
                        },
                        responses: [{
                            data: {
                                success: true,
                                poll: {
                                    id: null,
                                    type: 'none',
                                    question: 'Hello!'
                                }
                            }
                        }, {
                            data: {
                                success: true,
                                poll: {
                                    id: '1234',
                                    type: 'text',
                                    question: 'What is your name?'
                                }
                            }
                        }]
                    });

                    return ureport
                        .ureporters('+256775551122')
                        .polls.current({nones: {use: true}})
                        .then(function(poll) {
                            assert.deepEqual(poll, {
                                id: null,
                                type: 'none',
                                question: 'Hello!'
                            });
                        });
                });

                it("should get the next poll until a non-none poll is given",
                function() {
                    api.http.fixtures.add({
                        request: {
                            method: 'GET',
                            url: [
                                'http://example.com',
                                'ureporters/vumi_go_sms/+256775551122',
                                'polls/current'
                            ].join('/')
                        },
                        responses: [{
                            data: {
                                success: true,
                                poll: {
                                    id: null,
                                    type: 'none',
                                    question: 'Hello!'
                                }
                            }
                        }, {
                            data: {
                                success: true,
                                poll: {
                                    id: '1234',
                                    type: 'text',
                                    question: 'What is your name?'
                                }
                            }
                        }]
                    });

                    return ureport
                        .ureporters('+256775551122')
                        .polls.current({nones: {limit: 10}})
                        .then(function(poll) {
                            assert.deepEqual(poll, {
                                id: '1234',
                                type: 'text',
                                question: 'What is your name?'
                            });
                        });
                });

                it("should concat the non-polls to the actual poll if asked",
                function() {
                    api.http.fixtures.add({
                        request: {
                            method: 'GET',
                            url: [
                                'http://example.com',
                                'ureporters/vumi_go_sms/+256775551122',
                                'polls/current'
                            ].join('/')
                        },
                        responses: [{
                            data: {
                                success: true,
                                poll: {
                                    id: null,
                                    type: 'none',
                                    question: 'Hello!'
                                }
                            }
                        }, {
                            data: {
                                success: true,
                                poll: {
                                    id: '1234',
                                    type: 'text',
                                    question: 'What is your name?'
                                }
                            }
                        }]
                    });

                    return ureport
                        .ureporters('+256775551122')
                        .polls.current({nones: {concat: true}})
                        .then(function(poll) {
                            assert.deepEqual(poll, {
                                id: '1234',
                                type: 'text',
                                question: 'Hello! What is your name?'
                            });
                        });
                });
            });
        });

        describe(".ureporters.polls.topics", function() {
            it("should the return current topics", function() {
                api.http.fixtures.add({
                    request: {
                        method: 'GET',
                        url: [
                            'http://example.com',
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
                api.http.fixtures.add({
                    request: {
                        method: 'POST',
                        url: [
                            'http://example.com',
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
                        var request = api.http.requests[0];

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
                api.http.fixtures.add({
                    request: {
                        method: 'GET',
                        url: [
                            'http://example.com',
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
                api.http.fixtures.add({
                    request: {
                        method: 'POST',
                        url: [
                            'http://example.com',
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
                        var request = api.http.requests[0];

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
