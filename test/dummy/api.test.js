describe("vumi_ureport.dummy.api", function() {
    describe("DummyUReportApi", function() {
        describe(".ureporters.get", function() {
            it("should return the ureporter's data");
        });

        describe(".ureporters.is_registered", function() {
            it("should return true if the ureporter is registered");
            it("should return false if the ureporter is not registered");
            it("should return false if the ureporter is not found");
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
