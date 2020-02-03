"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var extraire_1 = require("./operation/extraire");
var ButtonManager_1 = require("./ButtonManager");
var html_assets_1 = require("./html-assets");
var menuManager = /** @class */ (function () {
    function menuManager() {
    }
    menuManager.prototype.extractManager = function (log, panel, mapApi) {
        var list = log.getthemeAcc();
        var listserver = log.getenvAcc();
        /************* Extraire ***************/
        var ext = new extraire_1.Extraire('', '', '', '', '', '');
        var mb = new ButtonManager_1.manageButton();
        //activate the controls for Extraction
        mb.angularcontrols(ext, log._token, mapApi);
        //set the dropdown list for the form
        var ddlEnv = ext.interactiveDropDownList(listserver);
        var ddltheme = ext.interactiveDropDownList(list);
        //add the dropdown list for the form
        var output = html_assets_1.formExtraire.replace(/{dropdowntheme}/, ddltheme);
        output = output.replace(/{dropdownenv}/, ddlEnv);
        // TODO: compiler ton code pour que la directive Angular soit associe a ton code.
        // Append element
        mb.compileTemplate(output, mapApi);
        //add the compile template to the panel
        panel.body = output;
    };
    menuManager.prototype.planifManager = function (log, panel, mapApi) {
    };
    return menuManager;
}());
exports.menuManager = menuManager;