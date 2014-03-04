var assert = require('assert');

describe("states", function() {
    var vumigo = require('vumigo_v02');
    var test_utils = vumigo.test_utils;
    var Translator = vumigo.translate.Translator;
    var PollSummaryState = vumi_ureport.states.PollSummaryState;

    describe("PollSummaryState", function() {
        var i18n;
        var state;

        beforeEach(function() {
            i18n = new Translator({
                locale_data: {
                    messages: {
                        '': {},
                        "Total Responses": [null, "i18n(Total Responses)"]
                    }
                }
            });

            state = new PollSummaryState({
                total_responses_label: test_utils.$('Total Responses'),
                summary: {
                    total_responses: 3756,
                    responses: [{
                        "count": 423,
                        "name": "Uncategorized"
                    }, {
                        "count": 2500,
                        "name": "22 - 31"
                    }, {
                        "count": 833,
                        "name": "32 - 41"
                    }]
                }
            });
        });

        describe(".translate", function() {
            it("should translate its 'total responses' label", function() {
                assert.deepEqual(state.total_responses_label, {
                    method: 'gettext',
                    args: ['Total Responses']
                });

                state.translate(i18n);

                assert.equal(
                    state.total_responses_label,
                    'i18n(Total Responses)');
            });
        });

        describe(".display", function() {
            it("should display the summary", function() {
                state.translate(i18n);
                assert.equal(state.display(), [
                    "i18n(Total Responses): 3756",
                    "Uncategorized: 423",
                    "22 - 31: 2500",
                    "32 - 41: 833"
                ].join('\n'));
            });
        });
    });
});
