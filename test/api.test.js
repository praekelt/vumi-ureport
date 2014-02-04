var assert = require("assert");

var vumigo = require('vumigo_v02');
var test_utils = vumigo.test_utils;
var utils = vumigo.utils;

var UReportApi = vumi_ureport.api.UReportApi;


describe("api", function() {
    describe("UReportApi", function() {
        describe(".ureporters.get", function() {
            it("should return the ureporter's data");
            it("should return null if no ureporter is found");
        });

        describe(".ureporters.polls.current", function() {
            it("should the return current poll");
        });

        describe(".ureporters.polls.topics", function() {
            it("should the return current topics");
        });

        describe(".ureporters.poll.responses.submit", function() {
            it("should submit a poll response");
            it("should return the submission result");
        });

        describe(".ureporters.poll.summary", function() {
            it("should return the poll summary");
        });

        describe(".ureporters.reports.submit", function() {
            it("should submit a report");
            it("should return the submission result");
        });
    });
});
