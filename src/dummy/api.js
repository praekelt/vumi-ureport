vumi_ureport.dummy.ureport = function() {
    var vumigo = require('vumigo_v02');
    var utils = vumigo.utils;
    var Extendable = utils.Extendable;

    var DummyUReportApi = Extendable.extend(function(self) {
        self.ureporters = function(user_addr) {
        };
    });

    var DummyUReportersApi = Extendable.extend(function(self) {
        self.get = function() {
        };

        self.is_registered = function() {
        };

        self.polls = {};

        self.polls.current = function() {
        };

        self.polls.topics = function() {
        };

        self.poll = function(id) {
        };

        self.reports = {};
        self.reports.submit = function(report) {
        };
    });

    var DummyPollApi = Extendable.extend(function(self) {
        self.responses = {};

        self.responses.submit = function(response) {
        };

        self.summary = function() {
        };
    });

    return {
        DummyUReport: DummyUReport,
        DummyUReporter: DummyUReporter,
        DummyPoll: DummyPoll
    };
}();
