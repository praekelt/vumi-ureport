var Q = require('q');
var assert = require('assert');

var DummyUReportApi = vumi_ureport.dummy.DummyUReportApi;
var Stub = vumi_ureport.dummy.Stub;
var Stubs = vumi_ureport.dummy.Stubs;


describe("dummy", function() {
    describe("Stub", function() {
        it("should throw an error if no return value is provided", function() {
            var stub = new Stub();
            return stub().catch(function(e) {
                assert.equal(e.message, "No return value provided for stub");
            });
        });
        
        describe(".returns", function() {
            it("should change the stub's return value", function() {
                var stub = new Stub();
                var values = [];

                stub.returns('foo');
                values.push(stub());

                stub.returns('bar');
                values.push(stub());

                return Q.all(values).then(function(values) {
                    assert.deepEqual(values, ['foo', 'bar']);
                });
            });
        });

        describe("when the stub is called", function() {
            it("should use the first predicate that matches the call args",
            function() {
                var stub = new Stub();

                stub
                    .when(function(arg) { return arg === 'a'; })
                    .returns('foo');

                stub
                    .when(function(arg) { return arg === 'b'; })
                    .returns('bar');

                stub
                    .when(function(arg) { return arg === 'b'; })
                    .returns('baz');

                return stub('b').then(function(result) {
                    assert.equal(result, 'bar');
                });
            });

            it("should fall back to its own return value", function() {
                var stub = new Stub();

                stub.returns('qux');

                stub
                    .when(function(arg) { return arg === 'a'; })
                    .returns('foo');

                return stub('d').then(function(result) {
                    assert.equal(result, 'qux');
                });
            });
        });
    });

    describe("Stubs", function() {
        var Things = Stubs.extend(function(self, predicate) {
            self = Stubs.call(self, predicate);
            self.thing = new Stub();
            return self;
        });

        it("should use different stubs based on its call args", function() {
            var things = new Things();

            things
                .when(function(arg) { return arg === 'a'; })
                .thing
                    .when(function(arg) { return arg === 'b'; })
                    .returns('foo');

            things
                .when(function(arg) { return arg === 1; })
                .thing
                    .when(function(arg) { return arg === 2; })
                    .returns('bar');

            return Q
                .all([
                    things('a').thing('b'),
                    things(1).thing(2)])
                .then(function(results) {
                    assert.deepEqual(results, ['foo', 'bar']);
                });
        });
    });

    describe("DummyUReportApi", function() {
        var ureport;

        beforeEach(function() {
            ureport = new DummyUReportApi();
        });

        describe(".ureporters.get", function() {
            it("should be a stub", function() {
                assert.equal(ureport.ureporters.get.type, Stub);
            });
        });

        describe(".ureporters.polls.current", function() {
            it("should be a stub", function() {
                assert.equal(ureport.ureporters.polls.current.type, Stub);
            });
        });

        describe(".ureporters.polls.topics", function() {
            it("should be a stub", function() {
                assert.equal(ureport.ureporters.polls.topics.type, Stub);
            });
        });

        describe(".ureporters.reports.submit", function() {
            it("should be a stub", function() {
                assert.equal(ureport.ureporters.reports.submit.type, Stub);
            });
        });

        describe(".ureporters.poll.responses.submit", function() {
            it("should be a stub", function() {
                assert.equal(ureport.ureporters.poll.responses.submit.type, Stub);
            });
        });

        describe(".ureporters.poll.summary", function() {
            it("should be a stub", function() {
                assert.equal(ureport.ureporters.poll.summary.type, Stub);
            });
        });
    });
});
