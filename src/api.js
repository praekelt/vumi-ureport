vumi_ureport.api = function() {
    var vumigo = require('vumigo_v02');
    var utils = vumigo.utils;
    var Extendable = utils.Extendable;

    var JsonApi = vumigo.http_api.JsonApi;
    var HttpResponseError = vumigo.http_api.HttpResponseError;

    var UReportApi = Extendable.extend(function(self, im, base_url, opts) {
        self.http = JsonApi.call(self, im, opts);
        self.base_url = base_url;

        self.url = function(paths) {
            return [self.base_url, paths].join('/');
        };

        self.ureporters = function(backend, user_addr) {
            return new UReportersApi(self, backend, user_addr);
        };
    });

    var UReportersApi = Extendable.extend(function(self, api, backend, user_addr) {
        self.api = api;
        self.backend = backend;
        self.user_addr = user_addr;

        self.url = function(path) {
            return self.api.url(['ureporters', path].join('/'));
        };

        self.get = function() {
            return self
                .api.http.get(self.url())
                .get('user')
                .catch(catch_code(404, null));
        };

        self.polls = {};

        self.polls.current = function() {
            return self
                .api.http.get(self.url('polls/current'))
                .get('poll');
        };

        self.polls.topics = function() {
            return self
                .api.http.get(self.url('polls/topics'))
                .get('poll_topics');
        };

        self.poll = function(id) {
            return new PollApi(self, id);
        };

        self.reports = {};
        self.reports.submit = function(report) {
            return self
                .api.http.post(self.url('reports/'), {
                    data: {report: report}
                })
                .get('result');
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
            ].join('/'));
        };

        self.responses = {};

        self.responses.submit = function(response) {
            return self
                .api.http.post(self.url('responses/'), {
                    data: {response: response}
                })
                .get('result');
        };

        self.summary = function() {
            return self
                .api.http.get(self.url('summary'))
                .get('poll_result');
        };
    });

    function catch_code(code, result) {
        return function(e) {
            var match = e instanceof HttpResponseError
                     && e.reponse.code === code;

            if (!match) {
                throw e;
            }

            return utils.maybe_call(result);
        };
    }

    return {
        UReportApi: UReportApi,
        UReportersApi: UReportersApi,
        PollApi: PollApi
    };
}();
