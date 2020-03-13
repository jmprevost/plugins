"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateform = "\n<div ng-controller=\"submitFromV as ctrl9\">\n    <div ng-style=\"SelectedMenuV\" class=\"divButtonUti\" ng-click=\"ctrl1.ShowHideV()\">\n        <h2>{{ 'plugins.geosys.valider' | translate }}</h2>\n    </div>\n    <div ng-show=\"IsVisibleV\" ng-style=\"bgEnv\">\n        <form name=\"valiform\">\n            <div class=\"rv-subsection\">\n                <md-input-container class=\"ddlshowEX\">\n                    <label>{{ 'plugins.geosys.themet' | translate }}</label>\n                    <md-select \n                    ng-model=\"ctrl9.selectedItemE\" \n                    ng-change=\"ctrl9.setList()\" \n                    id=\"theme\" \n                    required>\n                        <md-option ng-repeat=\"item in ctrl9.itemsE\" ng-value=\"item.value\" ng-selected=\"ctrl9.itemsE.indexOf(item) == 0\">\n                            {{ item.name }}\n                        </md-option>\n                    </md-select>\n                </md-input-container>\n                <md-input-container class=\"ddlshowEX\">\n                    <label>{{ 'plugins.geosys.idUT' | translate }}</label>\n                    <md-select\n                    ng-model=\"ctrl9.selectedItemF\"\n                    ng-change=\"ctrl9.setList()\"\n                    required>\n                        <md-option ng-repeat=\"item in ctrl9.itemsF\" ng-value=\"item.value\">\n                            {{ item.name }}\n                        </md-option>\n                    </md-select>\n                </md-input-container>\n\n                \n                    <label class=\"advanced\">{{ 'plugins.geosys.filejson' | translate }}</label>\n                    <input  type=\"file\" id=\"fileJSON\" accept=\".json\"/>\n                \n                <md-input-container class=\"submitbtn\">\n                    <md-button class=\"md-primary md-raised\" style=\"float: right;\"\n                    ng-click=\"ctrl9.submitFormV(); ctrl1.ShowHideV()\" ng-disabled=\"valiform.$invalid\">\n                        {{ 'plugins.geosys.submit' | translate }}\n                        <md-tooltip>{{ 'plugins.geosys.submit' | translate }}</md-tooltip>\n                    </md-button>\n                </md-input-container>\n            </div>\n        </form>\n    </div>\n</div>\n";