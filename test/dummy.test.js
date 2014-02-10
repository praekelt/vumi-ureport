var Q = require('q');
var sinon = require('sinon');
var assert = require('assert');

var dummy = vumi_ureport.dummy;
var DummyUReportApi = vumi_ureport.dummy.DummyUReportApi;
var Stub = vumi_ureport.dummy.Stub;
var Stubs = vumi_ureport.dummy.Stubs;


describe("dummy", function() {
    describe("Stub", function() {
        it("should always return a promise", function() {
            var s = new Stub('some.stub');
            s.returns('foo');
            s.withArgs('a').returns('bar');
            s.withArgs('b').returns('baz');
            assert(Q.isPromise(s()));
            assert(Q.isPromise(s('a')));
            assert(Q.isPromise(s('b')));
        });

        it("should throw an error if no return value is provided", function() {
            var s = new Stub('some.stub');
            return s().catch(function(e) {
                assert.equal(
                    e.message,
                    "No return value provided for 'some.stub'");
            });
        });
    });

    describe("Stubs", function() {
        var Things = Stubs.extend(function(self) {
            self = Stubs.call(self, Things);
            self.thing = new Stub('thing');
            return self;
        });

        describe(".withArgs", function() {
            it("should spy on its stubs differently based on the arguments",
            function() {
                var things = new Things();

                things
                    .withArgs('a')
                    .thing.withArgs('b')
                    .returns('c');

                things
                    .withArgs(1)
                    .thing.withArgs(2)
                    .returns(3);

                var checks = [];
                checks.push(things('a').thing('b').then(function(result) {
                    assert.equal(result, 'c');
                }));

                checks.push(things(1).thing(2).then(function(result) {
                    assert.equal(result, 3);
                }));

                return Q(checks);
            });
        });
    });

    describe("DummyUReportApi", function() {
        var ureport;

        beforeEach(function() {
            ureport = new DummyUReportApi();
        });

        function isStub(obj, stub_name) {
            return obj.stub_name === stub_name;
        }

        describe(".ureporters.get", function() {
            it("should be a stub", function() {
                assert(isStub(
                    ureport.ureporters.get,
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
