"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.infoUser = "\n<div ng-controller=\"infoUserCtrl as ctrl13\">\n    <div>\n        {{ 'plugins.geosys.username' | translate }} : (username)\n    </div>\n    <div>\n        {{ 'plugins.geosys.themeI' | translate }} : (theme)\n    </div>\n    <div>\n        {{ 'plugins.geosys.right' | translate }} : (right)\n    </div>\n    <div>\n        {{ 'plugins.geosys.equipe' | translate }} : (equipe)\n    </div>\n    <div>\n        {{ 'plugins.geosys.enviro' | translate }} : (envir)\n    </div>\n    <div>\n        <md-input-container>\n            <label>E-mail</label>\n            <input type=\"text\" ng-model=\"ctrl13.emailUser\" />\n            <md-button ng-click=\"ctrl13.changeEmail()\">\n                Change Email\n            </md-button>\n        </md-input-container>\n        <md-input-container>\n            <md-checkbox ng-model=\"ctrl13.checkAdvanced\" ng-click=\"ctrl13.checkingAdvanced()\">\n                Advanced settings\n            </md-checkbox>\n        </md-input-containe>\n    </div>\n</div>\n";