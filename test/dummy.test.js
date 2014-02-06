var Q = require('q');
var assert = require('assert');

var dummy = vumi_ureport.dummy;


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
    });
});
