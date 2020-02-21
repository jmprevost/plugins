export const validateform:string = `
<div ng-controller="submitFromV as ctrl9">
    <div ng-style="SelectedMenuV" class="divButton" ng-click="ctrl9.ShowHide()">
        <h2>{{ 'plugins.geosys.valider' | translate }}</h2>
    </div>
    <div ng-show="IsVisible" ng-style="bgEnv">
        <div class="rv-subsection">
            <md-input-container class="ddlshowEX">
                <label>{{ 'plugins.geosys.themet' | translate }}</label>
                <md-select 
                ng-model="ctrl9.selectedItemE" 
                ng-change="ctrl9.setList()" 
                id="theme" 
                placeholder="{{ 'plugins.geosys.themet' | translate }}">
                    <md-option ng-repeat="item in ctrl9.itemsE" ng-value="item.value">
                        {{ item.name }}
                    </md-option>
                </md-select>
            </md-input-container>
            <md-input-container class="ddlshowEX">
                <label>{{ 'plugins.geosys.idUT' | translate }}</label>
                <md-select
                ng-model="ctrl9.selectedItemF"
                ng-change="ctrl9.setList()"
                placeholder="{{ 'plugins.geosys.idUT' | translate }}">
                    <md-option ng-repeat="item in ctrl9.itemsF" ng-value="item.value">
                        {{ item.name }}
                    </md-option>
                </md-select>
            </md-input-container>

            
                <label class="advanced">{{ 'plugins.geosys.filejson' | translate }}</label>
                <input  type="file" id="fileJSON" accept=".json"/>
            
            <md-input-container class="submitbtn">
                <md-button class="md-primary md-raised" style="float: right;"
                ng-click="ctrl9.submitFormD()">
                    {{ 'plugins.geosys.submit' | translate }}
                    <md-tooltip>{{ 'plugins.geosys.submit' | translate }}</md-tooltip>
                </md-button>
            </md-input-container>
        </div>
    </div>
</div>
`;