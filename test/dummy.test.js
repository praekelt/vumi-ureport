var assert = require("assert");

var vumigo = require('vumigo_v02');
var test_utils = vumigo.test_utils;
var utils = vumigo.utils;
var DummyApi = vumigo.DummyApi;
var JsonApi = vumigo.http_api.JsonApi;
var DummyUReportApi = vumi_ureport.dummy.DummyUReportApi;


describe("api", function() {
    describe("DummyUReportApi", function() {
        var http;
        var ureport;

        beforeEach(function() {
            return test_utils.make_im().then(function(im) {
                ureport = new DummyUReportApi(im.api, 'http://example.com');
                http = new JsonApi(im);
            });
        });

        describe(".add_fixture", function() {
            it("should add work with json http api requests", function() {
                ureport.add_fixture({
                    request: {
                        method: 'GET',
                        url: 'foo',
                        body: '{"foo":"bar"}'
                    },
                    response: {
                        code: 200,
                        body: '{"baz":"qux"}'
                    }
                });

                return http
                    .get('http://example.com/foo', {data: {foo: 'bar'}})
                    .then(function(response) {
                        assert.deepEqual(response.data, {baz: 'qux'});
                    });
            });

            it("should json stringify request data", function() {
                ureport.add_fixture({
                    request: {
                        method: 'GET',
                        url: 'foo',
                        data: {foo: 'bar'}
                    },
                    response: {
                        code: 200
                    }
                });

                return http.get(
                    'http://example.com/foo',
                    {data: {foo: 'bar'}});
            });

            it("should json stringify response data", function() {
                ureport.add_fixture({
                    request: {
                        method: 'GET',
                        url: 'foo'
                    },
                    response: {
                        data: {foo: 'bar'}
                    }
                });

                return http
                    .get('http://example.com/foo')
                    .then(function(response) {
                        assert.deepEqual(response.data, {foo: 'bar'});
                    });
            });
        });

        describe('.last_request', function() {
            it("should retrieve the last request", function() {
                    ureport.add_fixture({
                        request: {
                            method: 'GET',
                            url: 'foo'
                        }
                    });

                    ureport.add_fixture({
                        request: {
                            method: 'GET',
                            url: 'bar'
                        }
                    });

                    return http
                        .get('http://example.com/foo')
                        .then(function(response) {
                            return http.get('http://example.com/bar');
                        })
                        .then(function() {
                            var request = ureport.last_request();
                            assert.equal(
                                request.url,
                                'http://example.com/bar');
                        });
            });
        });
    });
});
