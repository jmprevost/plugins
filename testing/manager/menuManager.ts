/****** Import ******/
import { manageController } from "./ControllerManager";
import { formExtraire, formPlanifier } from '../config/html-assets';
import { login } from '../login';

export class menuManager{


    constructor(){}

    extractManager(log:login, panel:any, mapApi:any):string{
        let list = log.getthemeAcc();
        let listserver = log.getenvAcc();

        /************* Extraire ***************/
        //let ext = new Extraire('','','','','','');
        let mb = new manageController();

        //activate the controls for Extraction
        //A enlever le panel
        mb.extrairecontrols(log,panel, mapApi);

        //set the dropdown list for the form
        let ddlEnv = this.interactiveDropDownList(listserver);
        let ddltheme = this.interactiveDropDownList(list);
        

        //add the dropdown list for the form
        let output = formExtraire.replace(/{dropdowntheme}/, ddltheme);
        output = output.replace(/{dropdownenv}/,ddlEnv);

        /******** add the drop down list with the theme selected *********/
        let listiduw = log.getUtravail(log._idUt[0].getTheme());
        let ddlid = this.interactiveDropDownList(listiduw);
        //this.setDDLidWorkingUnit()
        output = output.replace(/{dropdownid}/,ddlid);

        // TODO: compiler ton code pour que la directive Angular soit associe a ton code.
        // Append element
        mb.compileTemplate(output,mapApi);

        //add the compile template to the panel
        return output;
    }

    planifManager(log:login, panel:any, mapApi:any):string{
        let list = log.getthemeAcc();
        let listserver = log.getenvAcc();


        /********* Planifier *********/
        let mb = new manageController();

        //A Enlever le panel
        mb.planControl(log,panel, mapApi);

        let ddlEnv = this.interactiveDropDownList(listserver);
        let ddltheme = this.interactiveDropDownList(list);
        

        //add the dropdown list for the form
        let output = formPlanifier.replace(/{dropdowntheme}/, ddltheme);
        output = output.replace(/{dropdownenv}/,ddlEnv);

        //let plan:planifier = new planifier('','','','','','','','');

        let listiduw = log.getUtravail(log._idUt[0].getTheme());
        let ddlid = this.interactiveDropDownList(listiduw);

        //this.setDDLidWorkingUnit();

        output = output.replace(/{dropdownid}/,ddlid);

        // TODO: compiler ton code pour que la directive Angular soit associe a ton code.
        // Append element
        mb.compileTemplate(output,mapApi);

        //add the compile template to the panel
        return output;
    }

       //create a drop list for the template
   interactiveDropDownList(list:string[]):string{
    let ddl:string= "";
    for (let i in list) {
        ddl += `<option value="` + list[i] + `">`+ list[i] + `</option>`
    }   ;
    return ddl;
    } 


    setDDLidWorkingUnit():void{
        $("#testclick").click(function(){
            alert('hello');
        });
    }




}