vumi_ureport.api = function() {
    var vumigo = require('vumigo_v02');
    var utils = vumigo.utils;
    var Extendable = utils.Extendable;
    var JsonApi = vumigo.http_api.JsonApi;

    var UReportApi = Extendable.extend(function(self, im, base_url, opts) {
        self.http = JsonApi.call(self, im, opts);
        self.base_url = base_url;

        self.url = function(paths) {
            return [self.base_url]
                .concat(paths)
                .join('/');
        };

        self.ureporters = function(backend, user_addr) {
            return new UReportApi();
        };
    });

    var UReportersApi = Extendable.extend(function(self, api, backend, user_addr) {
        self.api = api;
        self.backend = backend;
        self.user_addr = user_addr;

        self.url = function(paths) {
            return self.api.url([
                'ureporters',
                self.backend,
                self.user_addr
            ].concat(paths));
        };

        self.get = function() {
            return self.api.http.get(self.url());
        };

        self.polls = {};

        self.polls.current = function() {
            return self.api.http.get(self.url(['polls', 'current']));
        };

        self.polls.topics = function() {
            return self.api.http.get(self.url(['polls', 'topics']));
        };

        self.poll = function(id) {
            return new PollApi(self, id);
        };

        self.reports = {};
        self.reports.submit = function(report) {
            return self.api.http.post(self.url(['reports/']), {
                data: {report: report}
            });
        };
    });

    var PollApi = Extendable.extend(function(self, ureporter, id) {
        self.id = id;
        self.api = ureporter.api;
        self.ureporter = ureporter;

        self.url = function(paths) {
            return self.ureporter.url([
                'poll',
                self.id
            ].concat(paths));
        };

        self.responses = {};

        self.responses.submit = function(response) {
            return self.api.http.post(self.url(['responses/']), {
                data: {response: response}
            });
        };

        self.summary = function() {
            return self.api.http.get(self.url(['summary']));
        };
    });

    return {
        UReportApi: UReportApi,
        UReportersApi: UReportersApi,
        PollApi: PollApi
    };
}();
