vumi_ureport.init = function() {
    var vumigo = require('vumigo_v02');
    var InteractionMachine = vumigo.InteractionMachine;
    var VumiUreportApp = vumi_ureport.app.VumiUreportApp;


    return {
        im: new InteractionMachine(global.api, new VumiUreportApp())
    };
}();
