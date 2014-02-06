var Q = require('q');
var sinon = require('sinon');


vumi_ureport.dummy = function() {
    function stub(name) {
        var s = sinon.stub();
        var invoke = s.invoke;

        s.invoke = function() {
            return Q(invoke.apply(this, arguments)).delay(0);
        };

        s.returns(Q().then(function() {
            throw new Error("No return value provided for '" + name + "'");
        }));

        return s;
    }

    return {
        stub: stub
    };
}();
