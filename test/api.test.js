var _ = require('underscore');
var assert = require('assert');

var vumigo = require('vumigo_v02');
var test_utils = vumigo.test_utils;
var utils = vumigo.utils;

var UReportApi = vumi_ureport.api.UReportApi;


describe("api", function() {
    describe("UReportApi", function() {
        var ureport;

        function add_fixture(ureport, opts) {
            opts.request = _(opts.request || {}).defaults({
                content_type: 'application/json; charset=utf-8'
            });

            opts.response = _(opts.response || {}).defaults({
                code: 200
            });

            if ('data' in opts.request) {
                opts.request.body = JSON.stringify(opts.request.data);
            }

            if ('data' in opts.response) {
                opts.response.body = JSON.stringify(opts.response.data);
            }

            ureport.im.api.add_http_fixture(opts);
        }

        function get_request(ureport) {
            var request = ureport.im.api.http_requests[0];

            if (request.body) {
                request.data = JSON.parse(request.body);
            }

            return request;
        }

        beforeEach(function() {
            return test_utils.make_im().then(function(im) {
                ureport = new UReportApi(
                    im,
                    'http://example.com',
                    'vumi_go_sms');
            });
        });

        it("should support basic auth", function() {
            return test_utils.make_im().then(function(im) {
                var ureport = new UReportApi(
                    im,
                    'http://example.com',
                    'vumi_go_sms', {
                        auth: {
                            username: 'root',
                            password: 'toor'
                        }
                    });

                add_fixture(ureport, {
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
                        var request = get_request(ureport);
                        assert.deepEqual(
                            request.headers.Authorization,
                            [utils.basic_auth('root', 'toor')]);
                    });
            });
        });

        describe(".ureporters.get", function() {
            it("should return the ureporter's data", function() {
                add_fixture(ureport, {
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
                add_fixture(ureport, {
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
                add_fixture(ureport, {
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
                add_fixture(ureport, {
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
                add_fixture(ureport, {
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
                        var request = get_request(ureport);

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
                add_fixture(ureport, {
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
                add_fixture(ureport, {
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
                        var request = get_request(ureport);

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
