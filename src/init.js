vumi_ureport.init = function() {
    var vumigo = require('vumigo_v02');
    var InteractionMachine = vumigo.InteractionMachine;
    var VumiUReportApp = vumi_ureport.app.VumiUReportApp;


    return {
        im: new InteractionMachine(api, new VumiUReportApp())
    };
}();
