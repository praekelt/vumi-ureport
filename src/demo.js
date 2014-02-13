vumi_ureport.demo = function() {
    var vumigo = require('vumigo_v02');
    var InteractionMachine = vumigo.InteractionMachine;
    var VumiUReportApp = vumi_ureport.app.VumiUReportApp;
    var DummyUReportApi = vumi_ureport.dummy.DummyUReportApi;

    var ureport = new DummyUReportApi();
    var app = new VumiUReportApp({ureport: ureport});
    var im = new InteractionMachine(api, app);

    ureport
        .ureporters
        .get.returns({
            registered: true,
            lang: "en"
        });

    ureport
        .ureporters
        .polls
        .current.returns({
            id: "poll_agriculture",
            language: "en",
            name: "Aggriculture",
            question: [
                "What are the biggest challenges to farming?",
                "1. Capital",
                "2. Lack of land",
                "3. Chemicals",
                "4. Market prices"
            ].join('\n'),
            question_voice: "http://www.example.com/poll1234.ogg",
            start_date: "2012-04-23T18:25:43.511Z",
            end_date: null,
            is_registration: false,
            type: "text",
            default_response: null,
            default_response_voice: null,
            response_type: "allow_all"
        });

    ureport
        .ureporters
        .polls
        .topics.returns([{
            poll_id: "poll_agriculture",
            label: "Agriculture"
        }, {
            poll_id: "poll_education",
            label: "Education "
        }]);

    ureport
        .ureporters
        .poll.when(function(poll_id) {
            return poll_id === "poll_agriculture";
        })
        .summary.returns({
            total_responses: 5756,
            responses: [ {
                label: "Capital",
                count: 1234
            }, {
                label: "Lack of land",
                count: 2522
            }, {
                label: "Chemicals",
                count: 432
            }, {
                label: "Market prices",
                count: 223
            }]
        });

    ureport
        .ureporters
        .poll.when(function(poll_id) {
            return poll_id === "poll_education";
        })
        .summary.returns({
            total_responses: 6329,
            responses: [ {
                label: "Funding",
                count: 4328
            }, {
                label: "Infrastructure",
                count: 1234
            }]
        });

    ureport
        .ureporters
        .poll.when(function(poll_id) {
            return poll_id === "poll_agriculture";
        })
        .responses.submit.returns({
            accepted: true,
            response: null
        });

    ureport
        .ureporters
        .reports
        .submit.returns({
            accepted: true,
            response: null
        });

    return {im: im};
}();
