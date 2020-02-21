

export const loginmenu:string= `
<div ng-controller="connexionCtrl as ctrl0">
    <div class="centerText"><h2>{{ 'plugins.geosys.login' | translate }}</h2></div>
    <md-input-container class="largeur">
    <label>{{ 'plugins.geosys.username' | translate }}</label> 
    <input type="text" id="username" placeholder="{{ 'plugins.geosys.username' | translate }}"/>
    </md-input-container>
    <md-input-container class="largeur">
    <label>{{ 'plugins.geosys.password ' | translate }}</label> 
    <input type="password" id="password" placeholder="{{ 'plugins.geosys.password ' | translate }}"/>
    </md-input-container>
    <div class="rv-subsection">
        <md-button class="md-primary md-raised" style="float: right;"
        ng-click="ctrl0.submitConn()">
            {{ 'plugins.geosys.submit' | translate }}
            <md-tooltip>{{ 'plugins.geosys.submit' | translate }}</md-tooltip>
        </md-button>

    </div>
</div>`;