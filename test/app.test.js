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

        describe("when the session starts", function() {
            describe("if the user is registered", function() {
                it("should show the main menu");
                it("should reset the user's language");
            });

            describe("if the user is not registered", function() {
                it("should show show the registration poll");
            });

            describe("if the user is not found", function() {
                it("should show show the registration poll");
            });
        });

        describe("when the user on a registration poll", function() {
            it("should send the user's response to ureport");

            describe("if it is not the last registration poll", function() {
                it("should show the next registration poll");
            });

            describe("if it is the last registration poll", function() {
                it("should show the main menu");
            });
        });

        describe("when the user is on the main menu", function() {
            describe("if the user chooses to take the poll", function() {
                it("should show the user the current poll");
            });

            describe("if the user chooses to view the results", function() {
                it("should show the user the current poll topics");
            });

            describe("if the user chooses to submit a report", function() {
                it("should ask the user to enter their report");
            });
        });

        describe("when the user is on the current poll", function() {
            it("should send the user's response to ureport");
            it("should show the user ureport's response");
            it("should allow falling back to a default response");
        });

        describe("when the user has submitted a poll response", function() {
            describe("if they choose to view the poll results", function() {
                it("should show them results for the poll they are on");
            });

            describe("if they to not view the poll results", function() {
                it("should show them the end-of-session response");
            });
        });

        describe("when the user is asked to choose a topic", function() {
            it("should show them the results for the chosen topic");
        });

        describe("when the user has submitted a report", function() {
            it("should send the user's input to ureport");
            it("should show the user ureport's response");
            it("should allow falling back to a default response");
            it("should start at the beginning on the next session");
        });

        describe("when the user at the end of the session screen", function() {
            it("should start at the beginning on the next session");
        });
    });
});
