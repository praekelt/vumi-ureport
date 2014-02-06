var Q = require('q');
var sinon = require('sinon');

var vumigo = require('vumigo_v02');
var utils = vumigo.utils;
var Extendable = utils.Extendable;


vumi_ureport.dummy = function() {
    var DummyUReportApi = Extendable.extend(function(self) {
        self.ureporters = utils.functor(new DummyUReportersApi());
    });

    var DummyUReportersApi = Extendable.extend(function(self) {
        self.get = stub('ureporters.get');

        self.polls = {};
        self.polls.current = stub('ureporters.polls.current');
        self.polls.topics = stub('ureporters.polls.topics');

        self.reports = {};
        self.reports.submit = stub('ureporters.reports.submit');

        self.poll = utils.functor(new DummyPollApi());
    });

    var DummyPollApi = Extendable.extend(function(self) {
        self.responses = {};
        self.responses.submit = stub('ureporters.poll.responses.submit');

        self.summary = stub('ureporters.poll.summary');
    });

    function stub(name) {
        var s = sinon.stub();
        var invoke = s.invoke;

        s.invoke = function() {
            return Q(invoke.apply(this, arguments)).delay(0);
        };

        s.returns(Q().then(function() {
            throw new Error("No return value provided for '" + name + "'");
        }));

        s._name_ = name;
        return s;
    }

    return {
        DummyUReportApi: DummyUReportApi,
        DummyUReportersApi: DummyUReportersApi,
        DummyPollApi: DummyPollApi,
        stub: stub
    };
}();
