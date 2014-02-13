vumi_ureport.dummy = function() {
    var Q = require('q');
    var _ = require('underscore');

    var vumigo = require('vumigo_v02');
    var utils = vumigo.utils;
    var Extendable = utils.Extendable;


    var Stub = Extendable.extend(function(self) {
        var type = self.constructor;

        self = function() {
            var args = arguments;

            var match = _(self.subordinates).find(function(subordinate) {
                return subordinate.predicate.apply(self, args);
            });

            var result = match
                ? match.stub.apply(match, args)
                : self.result;

            return self.parse(result);
        };

        self.result;
        self.type = type;
        self.subordinates = [];

        self.parse = function(result) {
            return Q(result).delay(0);
        };

        self.when = function(predicate) {
            var stub = new self.type();

            self.subordinates.push({
                stub: stub,
                predicate: predicate
            });

            return stub;
        };

        self.returns = function(result) {
            self.result = result;
        };

        self.returns(Q().then(function() {
            throw new Error("No return value provided for stub");
        }));

        return self;
    });

    var Stubs = Stub.extend(function(self) {
        self = Stub.call(self);

        self.parse = function(result) {
            return result;
        };

        self.returns(self);
        return self;
    });

    var DummyUReportApi = Extendable.extend(function(self) {
        self.ureporters = new DummyUReportersApi();
    });

    var DummyUReportersApi = Stubs.extend(function(self) {
        self = Stubs.call(self);

        self.get = new Stub();

        self.polls = {};
        self.polls.current = new Stub();
        self.polls.topics = new Stub();

        self.reports = {};
        self.reports.submit = new Stub();

        self.poll = new DummyPollApi();

        return self;
    });

    var DummyPollApi = Stubs.extend(function(self) {
        self = Stubs.call(self);

        self.responses = {};
        self.responses.submit = new Stub();

        self.summary = new Stub();

        return self;
    });


    return {
        DummyUReportApi: DummyUReportApi,
        DummyUReportersApi: DummyUReportersApi,
        DummyPollApi: DummyPollApi,
        Stub: Stub,
        Stubs: Stubs
    };
}();
