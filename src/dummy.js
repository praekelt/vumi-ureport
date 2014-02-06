vumi_ureport.dummy = function() {
    var vumigo = require('vumigo_v02');
    var utils = vumigo.utils;
    var Extendable = utils.Extendable;

    var DummyUReportApi = Extendable.extend(function(self, api, base_url) {
        self.api = api;
        self.base_url = base_url;

        self.add_fixture = function(fixture) {
            fixture.request = utils.set_defaults(fixture.request || {}, {
                content_type: 'application/json; charset=utf-8'
            });

            fixture.request.url = vumi_ureport.utils.join_paths(
                self.base_url,
                fixture.request.url);
            
            fixture.response = fixture.response || {};

            if ('data' in fixture.request) {
                fixture.request.body = JSON.stringify(fixture.request.data);
            }

            if ('data' in fixture.response) {
                fixture.response.body = JSON.stringify(fixture.response.data);
            }

            self.api.add_http_fixture(fixture);
        };

        self.last_request = function() {
            var requests = self.api.http_requests;
            var request = requests[requests.length - 1];

            if (request.body) {
                request.data = JSON.parse(request.body);
            }

            return request;
        };
    });

    return {
        DummyUReportApi: DummyUReportApi
    };
}();
