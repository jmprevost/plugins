/****** Import ******/
import { loginmenu } from './config/html-assets';
import { User } from './user';
import { menuManager } from './manager/menuManager';
import { legendLayer } from '../tests/rampPage';

export default class Testing{
    
    //initiation
    /**
     * Initialize the plugins into the viewer
     * @param {*} api Ramp API 
     * @memberof Testing
     */
    init(api: any) {
        //set la variable api pour le plugin
        this.mapApi = api;
        //set _RV
        this.config = this._RV.getConfig('plugins').testing;
        //set la langue pour le plugin
        this.config.language = this._RV.getCurrentLang();
        //set la config pour la geometry
        //to try
        this.config.url = this._RV.getConfig('services').geometryUrl;

        //this.config.Layer  = this._RV.getConfig('map').layers;
        //création d'un button d'accès à partir du menu
        this.button = this.mapApi.mapI.addPluginButton(
            Testing.prototype.translations[this._RV.getCurrentLang()].testbutton,
            this.onMenuItemClick()
        );
        //Ajoute un panel
        this.addLoginPanel();
    }

  

    /**
     * Add a button in the side to open the plugins and close this side menu
     * @returns 
     * @memberof Testing
     */
    onMenuItemClick() {
        return () => {
            //this.button.isActive = !this.button.isActive;
            //alert(this.mapApi.layer);
            this._RV.toggleSideNav('close');

            
            //open the panel
            this.panel.open();  
        };
    }


    //Creating a login menu
    /**
     *Création du panel pour le plugins et ensuite ajoute le formulaire pou la connexion 
     * de l'utilisateur 
     * @memberof Testing
     */
    addLoginPanel(){
        //permet d'Activer le bouton connexion/ login
        let output:string = loginmenu;

        //creating the panel with the dimension and a title for the application
        this.panel = this.mapApi.panels.create('Test Login');
        this.panel.element.css({bottom: '0em', width: '400px', top: '50px'})
        this.panel.header.title = 'Generic Title';

        //add control for the login button
        this.connexionControls(this.panel,this.mapApi,this.config);
        
        
        //compile the login template
        this.compileTemplate(output,this.mapApi);

        //add a close button 
        let closeBtn = this.panel.header.closeButton;
        //add a toggle button
        let toggleBtn = this.panel.header.toggleButton;
        //add the template to the panel
        this.panel.body = output;
    }


    /**
     * first controller, the one function is the submit button to do a connexion call to the API and
     * return all the information for the user and stored in the usr class.
     * @param {*} panel the panel from the viewer
     * @param {*} mapApi the API from the viewer and angular
     * @param {*} config the config of the viewer(the other file in samples)
     * @memberof Testing
     */
    connexionControls( panel:any,mapApi:any,config:any){
        //ajoute un controller au formulaire html
        this.mapApi.agControllerRegister('connexionCtrl', function($scope){
            //ajoute la fonction sous le controller au formulaire html
            this.submitConn = function() { 
                //prends les informations des input pour envoyer a l'API
                let log:User = new User((<HTMLInputElement>document.getElementById("username")).value
                ,(<HTMLInputElement>document.getElementById("password")).value);
                //Envoie le formulaire a l API
                let loginfo:any = log.submitForm();
                //si le retour ne contient pas de code d'erreur continue
                if (loginfo.status != 401){
                    //alert('Connected'); 
                    let menu:menuManager =  new menuManager(log,panel,mapApi,config);
                //si le retour de l'API contient un code d'erreur et le message
                }else{
                    alert(loginfo.code);
                    alert(loginfo.message);
                }
            }; 
        });
    }


    /**
     * Compile a html template to read to compil and replace all the variable inside the template
     * @param {*} template the html template to compile
     * @param {*} mapApi the API of the viewer to compile it(service angular)
     * @returns {JQuery<HTMLElement>}
     * @memberof Testing
     */
    compileTemplate(template,mapApi): JQuery<HTMLElement> {
        let temp = $(template);
        mapApi.$compile(temp);
        return temp;
    }
};

//Inteface pour avoir accèes au element du viewer
export default interface Testing{
    mapApi: any,
    _RV: any,
    config: any,
    button:any,
    translations: any,
    panel:any;
};

//translate label
Testing.prototype.translations = {
    'en-CA': {
        //Commun
        envir: 'Select an environnement :',
        themet: 'Select a theme :',
        idUT: 'Select a working unit id :',
        geome: 'Add your Geometry :',
        submit: 'Submit',
        cancel: 'Cancel',
        where: 'Enter a Where Clause :',
        //Extraction seulement
        extrac: 'Planned Extract',
        extract: 'Unplanned Extract',
        clip: 'If clip',
        //Planifier seulement
        testbutton: 'GeoSys',
        planif: 'Planning',
        typeTrv: 'working type :',
        classe: 'Select a class :',
        datefinprv: 'Final date planned',
        //Login seulement
        login: 'Login',
        username : "username",
        password : 'password',
        //Livraison seulement
        delivery : 'Delivery',
        postput : 'Select an operation :',
        insert : 'Insert',
        update : 'Update',
        fileMD : 'File metadata : ',
        fileGDB : 'File geodatabase : ',
        //CréerMD seulement
        creer : 'CreateMD',
        source : 'Select the sources ID : ',
        precision : 'Select the precision ID : ',
        contrainte : 'Select the legal contraint ID : ',
        //ValiderMd seulement
        //Nettoyage seulement
        nettoyage : 'Cleaning',
        //Annuler seulement
        annuler : 'Cancel',

    },

    'fr-CA': {
        
        //Commun
        envir: 'Environnement :',
        themet: 'Theme :',
        idUT: 'Selectionne un identifiant d unité de travail :',
        geome: 'Ajouter votre Géométrie :',
        submit: 'Soumettre',
        cancel: 'Annuler',
        where: 'Entrer une Where Clause :',
        //Extraction seulement
        extrac: 'Extraction Planifié',
        extract: 'Extraction Sans Retour',
        clip: 'Si clip',
        //Planifier seulement
        testbutton: 'GeoSys',
        planif: 'Planifier',
        typeTrv: 'Type de travail :',
        classe: 'selectionne une classe :',
        datefinprv: 'Date fin prévue',
        //Login seulement
        login: 'connexion :',
        username : "nom d'usager",
        password : 'mot de passe', 
        //Livraison seulement 
        delivery : 'Livraison',
        postput : 'Sélectionne une opération :',
        insert : 'Insérer',
        update : 'Mise à jour', 
        fileMD : 'Fichier métadonnée : ',
        fileGDB : 'Fichier géo base de donnée',
        //CréerMD seulement
        creer : 'CreerMD',
        source : 'Sélectionner les identifiants des sources : ',
        precision : 'Sélectionner les identifiant de précison : ',
        contrainte : 'Sélectionner les identifiants de contraintes légales : ',
        //ValiderMD seulement
        //Nettoyage seulement
        nettoyage : 'Nettoyage',
        //Annuler seulement
        annuler : 'Annuler',
    }
};

//accès du plugins à l'application
(<any>window).testing = Testing;
