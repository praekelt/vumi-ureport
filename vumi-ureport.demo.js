var vumi_ureport = global.vumi_ureport = {};

vumi_ureport.api = function() {
    var vumigo = require('vumigo_v02');
    var utils = vumigo.utils;
    var Extendable = utils.Extendable;

    var JsonApi = vumigo.http_api.JsonApi;
    var HttpResponseError = vumigo.http_api.HttpResponseError;

    var UReportApi = Extendable.extend(function(self, im, base_url, backend) {
        self.im = im;
        self.http = new JsonApi(im);
        self.base_url = base_url;
        self.backend = backend;

        self.url = function(path) {
            return join_paths(self.base_url, path);
        };

        self.ureporters = function(user_addr) {
            var rel_path = join_paths('ureporters', self.backend, user_addr);
            return new UReportersApi(self, rel_path);
        };
    });

    var UReportersApi = Extendable.extend(function(self, api, rel_path) {
        self.api = api;
        self.rel_path = rel_path;

        self.url = function(path) {
            return self.api.url(join_paths(self.rel_path, path));
        };

        self.get = function() {
            return self
                .api.http.get(self.url())
                .get('data')
                .get('user');
        };

        self.is_registered = function() {
            return self
                .get()
                .get('registered')
                .catch(catch_code(404, false));
        };

        self.polls = {};

        self.polls.current = function() {
            return self
                .api.http.get(self.url('polls/current'))
                .get('data')
                .get('poll');
        };

        self.polls.topics = function() {
            return self
                .api.http.get(self.url('polls/topics'))
                .get('data')
                .get('poll_topics');
        };

        self.poll = function(id) {
            return new PollApi(self, join_paths('poll', id));
        };

        self.reports = {};
        self.reports.submit = function(report) {
            return self
                .api.http.post(self.url('reports/'), {
                    data: {report: report}
                })
                .get('data')
                .get('result');
        };
    });

    var PollApi = Extendable.extend(function(self, ureporter, rel_path) {
        self.api = ureporter.api;
        self.ureporter = ureporter;
        self.rel_path = rel_path;

        self.url = function(path) {
            return self.ureporter.url(join_paths(self.rel_path, path));
        };

        self.responses = {};

        self.responses.submit = function(response) {
            return self
                .api.http.post(self.url('responses/'), {
                    data: {response: response}
                })
                .get('data')
                .get('result');
        };

        self.summary = function() {
            return self
                .api.http.get(self.url('summary'))
                .get('data')
                .get('poll_result');
        };
    });

    function catch_code(code, result) {
        return function(e) {
            var match = e instanceof HttpResponseError
                     && e.response.code === code;

            if (!match) {
                throw e;
            }

            return utils.maybe_call(result);
        };
    }

    function join_paths() {
        return Array.prototype.filter.call(arguments, function(path) {
            return !!path;
        }).join('/');
    }

    return {
        UReportApi: UReportApi,
        UReportersApi: UReportersApi,
        PollApi: PollApi
    };
}();

vumi_ureport.app = function() {
    var vumigo = require('vumigo_v02');
    var App = vumigo.App;
    var EndState = vumigo.states.EndState;


    var VumiUreportApp = App.extend(function(self) {
        App.call(self, 'initial_state');

        self.init = function() {
        };

        self.states.add(new EndState('initial_state', {
            text: 'Hello :)'
        }));
    });


    return {
        VumiUreportApp: VumiUreportApp
    };
}();

vumi_ureport.fixtures = function() {
    return {
    };
};

vumi_ureport.dummy = function() {
    return {
    };
};

vumi_ureport.demo = function() {
    return {
    };
}();
