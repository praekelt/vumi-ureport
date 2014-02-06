var vumigo = require('vumigo_v02');
var AppTester = vumigo.AppTester;
var VumiUReportApp = vumi_ureport.app.VumiUReportApp;


describe("VumiUReport", function() {
    var app;
    var tester;

    beforeEach(function() {
        app = new VumiUReportApp();
        tester = new AppTester(app);
    });

    describe("first interaction", function() {
        it("should say hello", function() {
            return tester
                .start()
                .check.state('initial_state')
                .check.reply('Hello :)')
                .run();
        });
    });
});
