var Q = require('q');
var sinon = require('sinon');
var assert = require('assert');

var dummy = vumi_ureport.dummy;
var DummyUReportApi = vumi_ureport.dummy.DummyUReportApi;


describe("dummy", function() {
    describe("stub", function() {
        it("should always return a promise", function() {
            var s = dummy.stub('some.stub');
            s.returns('foo');
            s.withArgs('a').returns('bar');
            s.withArgs('b').returns('baz');
            assert(Q.isPromise(s()));
            assert(Q.isPromise(s('a')));
            assert(Q.isPromise(s('b')));
        });

        it("should throw an error if no return value is provided", function() {
            return dummy.stub('some.stub')().catch(function(e) {
                assert.equal(
                    e.message,
                    "No return value provided for 'some.stub'");
            });
        });

        it("should attach the stub's name as an internal property",
        function() {
            var s = dummy.stub('some.stub');
            assert.equal(s._name_, 'some.stub');
        });
    });

    describe("DummyUReportApi", function() {
        var ureport;

        function isStub(obj, name) {
            return obj._name_ === name && 'returns' in obj;
        }

        beforeEach(function() {
            ureport = new DummyUReportApi();
        });

        describe(".ureporters.get", function() {
            it("should be a stub", function() {
                assert(isStub(
                    ureport.ureporters().get,
                    'ureporters.get'));
            });
        });

        describe(".ureporters.polls.current", function() {
            it("should be a stub", function() {
                assert(isStub(
                    ureport.ureporters().polls.current,
                    'ureporters.polls.current'));
            });
        });

        describe(".ureporters.polls.topics", function() {
            it("should be a stub", function() {
                assert(isStub(
                    ureport.ureporters().polls.topics,
                    'ureporters.polls.topics'));
            });
        });

        describe(".ureporters.reports.submit", function() {
            it("should be a stub", function() {
                assert(isStub(
                    ureport.ureporters().reports.submit,
                    'ureporters.reports.submit'));
            });
        });

        describe(".ureporters.poll.responses.submit", function() {
            it("should be a stub", function() {
                assert(isStub(
                    ureport.ureporters().poll().responses.submit,
                    'ureporters.poll.responses.submit'));
            });
        });

        describe(".ureporters.poll.summary", function() {
            it("should be a stub", function() {
                assert(isStub(
                    ureport.ureporters().poll().summary,
                    'ureporters.poll.summary'));
            });
        });
    });
});
