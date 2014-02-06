var Q = require('q');
var sinon = require('sinon');

var vumigo = require('vumigo_v02');
var utils = vumigo.utils;
var Extendable = utils.Extendable;


vumi_ureport.dummy = function() {
    var Stubs = Extendable.extend(function(self, type) {
        self = sinon.stub();

        var withArgs = self.withArgs;
        self.withArgs = function() {
            var other = new type();
            withArgs.apply(self, arguments).returns(other);
            return other;
        };

        self.returns(self);
        return self;
    });

    var Stub = Extendable.extend(function(self, stub_name) {
        self = sinon.stub();
        self.stub_name = stub_name;

        var invoke = self.invoke;
        self.invoke = function() {
            return Q(invoke.apply(this, arguments)).delay(0);
        };

        self.returns(Q().then(function() {
            throw new Error(
                "No return value provided for '" + self.stub_name + "'");
        }));

        return self;
    });

    var DummyUReportApi = Extendable.extend(function(self) {
        self.ureporters = new DummyUReportersApi();
    });

    var DummyUReportersApi = Stubs.extend(function(self) {
        self = Stubs.call(self, DummyUReportersApi);

        self.get = new Stub('ureporters.get');

        self.polls = {};
        self.polls.current = new Stub('ureporters.polls.current');
        self.polls.topics = new Stub('ureporters.polls.topics');

        self.reports = {};
        self.reports.submit = new Stub('ureporters.reports.submit');

        self.poll = new DummyPollApi();

        return self;
    });

    var DummyPollApi = Stubs.extend(function(self) {
        self = Stubs.call(self, DummyPollApi);

        self.responses = {};
        self.responses.submit = new Stub('ureporters.poll.responses.submit');

        self.summary = new Stub('ureporters.poll.summary');

        return self;
    });

    return {
        DummyUReportApi: DummyUReportApi,
        DummyUReportersApi: DummyUReportersApi,
        DummyPollApi: DummyPollApi,
        Stubs: Stubs,
        Stub: Stub
    };
}();
