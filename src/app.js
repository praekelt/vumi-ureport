vumi_ureport.app = function() {
    var vumigo = require('vumigo_v02');
    var App = vumigo.App;
    var EndState = vumigo.states.EndState;


    var VumiUReportApp = App.extend(function(self) {
        App.call(self, 'initial_state');

        self.init = function() {
        };

        self.states.add(new EndState('initial_state', {
            text: 'Hello :)'
        }));
    });


    return {
        VumiUReportApp: VumiUReportApp
    };
}();
