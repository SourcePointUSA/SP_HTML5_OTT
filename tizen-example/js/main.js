var DemoCMP = {},
    tileNavigation;

DemoCMP.LoadCMP = function () {
    tileNavigation = new Navigation();
    try {
        console.log('Widget version:', window.tizen.application.getAppInfo().version);
        console.log('Manufacturer:', window.tizen.systeminfo.getCapability('http://tizen.org/system/manufacturer'));
        console.log('Model name:', window.tizen.systeminfo.getCapability('http://tizen.org/system/model_name'));
        console.log('Platform:', window.tizen.systeminfo.getCapability('http://tizen.org/system/platform.name'), window.tizen.systeminfo.getCapability('http://tizen.org/feature/platform.version'));
    } catch (e) {
        console.log(e);
    }
};

window.onload = DemoCMP.LoadCMP();
