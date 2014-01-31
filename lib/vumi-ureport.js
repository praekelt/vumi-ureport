var vumi_ureport = global.vumi_ureport = {};

vumi_ureport.app = function() {
    var vumigo = require('vumigo_v02');
    var App = vumigo.App;
    var EndState = vumigo.states.EndState;


    var VumiUreportApp = App.extend(function(self) {
        App.call(self, 'initial_state');

        self.init = function() {
        };

        self.states.add(new EndState('initial_state', {
            text: 'Hello :)'
        }));
    });


    return {
        VumiUreportApp: VumiUreportApp
    };
}();

vumi_ureport.init = function() {
    var vumigo = require('vumigo_v02');
    var InteractionMachine = vumigo.InteractionMachine;
    var VumiUreportApp = vumi_ureport.app.VumiUreportApp;


    return {
        im: new InteractionMachine(global.api, new VumiUreportApp())
    };
}();
