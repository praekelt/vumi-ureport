var vumigo = require('vumigo_v02');
var AppTester = vumigo.AppTester;
var VumiUreportApp = vumi_ureport.app.VumiUreportApp;


describe("VumiUreport", function() {
    var app;
    var tester;

    beforeEach(function() {
        app = new VumiUreportApp();
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
