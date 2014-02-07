var vumigo = require('vumigo_v02');
var AppTester = vumigo.AppTester;
var VumiUReportApp = vumi_ureport.app.VumiUReportApp;


describe("app", function() {
    describe("VumiUReportApp", function() {
        var app;
        var tester;

        beforeEach(function() {
            app = new VumiUReportApp();
            tester = new AppTester(app);
        });
    });
});
