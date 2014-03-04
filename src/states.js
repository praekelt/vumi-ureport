vumi_ureport.states = function() {
    var vumigo = require('vumigo_v02');
    var EndState = vumigo.states.EndState;

    var PollSummaryState = EndState.extend(function(self, name, opts) {
        opts.text = null;
        self.summary = opts.summary;
        self.total_responses_label = opts.total_responses_label;
        EndState.call(self, name, opts);

        self.translate = function(i18n) {
            self.total_responses_label = i18n(self.total_responses_label);
        };

        self.display = function(i18n) {
            var parts = [];

            parts.push([
                self.total_responses_label,
                self.summary.total_responses
            ].join(': '));

            self.summary.responses.forEach(function(response) {
                parts.push([response.name, response.count].join(': '));
            });

            return parts.join('\n');
        };
    });

    return {
        PollSummaryState: PollSummaryState
    };
}();
