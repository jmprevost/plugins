import { urlLoginGet, urlgetidWu, urlEnvList,
     urlClassesList,urlWorkingType, urlGetCode } from './config/url';
import { connexion } from './apiConnect';
import { idWu } from './manager/idWU';
import { Environnement } from './manager/environnement';
import { Apireturn } from './apireturn';


export class User{

    /** Send to APi **/
    _username: string = 'hello';
    _password: string = 'hello';
    

    /** Environnement **/
    _environnementSel: string;
    _urlEnvselected:string;

    /** Connexion **/
    _conn: connexion = new connexion();
    
    /** Return of login **/
    _token: string;
    _tokentype: string;
    _expired: number = 3600;
    _rightRead:Apireturn;
    _rightWrite:Apireturn;

    /** List **/
    _themeAcc:Apireturn[] = [];
    _envAcc: Environnement[] = [];
    _equipe:Apireturn;
    _idUt:idWu;
    _classeslist:string[];
    _workinType:Apireturn[] = [];
    _geom:string;
    
    
    /**
     *Creates an instance of User. with only the username and a password for the connections
     * @param {string} [username] name of the user
     * @param {string} [password] password of the user
     * @memberof User
     */
    constructor(username?:string, password?:string){
        this._username =  username;
        this._password = password;
    }

    /**
     *Contruct an url with the environnement selected and the url for the action
     * @param {string} url url of the action
     * @param {string} [adding] add the theme or id at the end (optional)
     * @returns {string}
     * @memberof User
     */
    constructUrl(url:string, adding:string=''):string{
        return /*this._urlEnvselected*/ url + adding
    }

    /**
     * With the connexion to the APi send a json file with the username and the password in the header to get
     * the token for the rest of the connexion.
     * @returns {*} the data from the API. we dont know the return of the API so ANY.
     * @memberof User
     */
    submitForm():any{
        //To Change
             //create a json and save the file in the download folder 
        let json = '';
        let header:any = this.getInformationToHeader();
        let data:any = this._conn.connexionAPILogin(this.constructUrl(urlLoginGet),header);
        //Getting the list of environnement and their URL
        this.setListEnv(this._conn.connexionAPI(this.gettoken(), json, this.constructUrl(urlEnvList), 'Get'));

         //alert(data.access_token);
         if (!data.code){
            this.setDataFromAPI(data.access_token,data.token_type,data.expired, data.scope ,data.theme, data.equipe);
        }else{
            alert(data.code)
        }
         return data;
             
    };

    /**
     * Create the list of environnement and their url and place the PRO environnment in first
     * @param {*} output its the data from API.
     * @memberof User
     */
    setListEnv(output:any){
        for (let i in output){
            if(output[i].env === 'PRO'){
                this._envAcc.push(new Environnement(output[i].env,output[i].url))
                break;
            } 
        }
        for (let i in output){
            if(output[i].env != 'PRO'){
                this._envAcc.push(new Environnement(output[i].env,output[i].url))
            }  
        }
    }

    /**
     * Set the environnement url to a properties with the environnement selected
     * @param {string} env the environnement selected by the user
     * @memberof User
     */
    setEnvironnementSelected(env:string){
        for (let i in this._envAcc){
            if(this._envAcc[i]._env === env){
                this._urlEnvselected = this._envAcc[i]._urlEnv;
                //alert(this._urlEnvselected);
                break;
            } 
        }

    }

    /**
     * put the information of the user in a header for the first connexion to the API
     * @returns {*}
     * @memberof User
     */
    getInformationToHeader():any{
        //get de properties
        let output:any = {
            "usager": this._username,
            "mot_de_passe": this._password,
            "duree_token": this._expired
        };
        //let json:any = JSON.stringify(output)
        return output
    }

    //Ajoute le reste des données obtenu par le login
    /**
     * sett all the info information obtain form a login into the properties of the class
     *
     * @param {string} token
     * @param {string} token_type
     * @param {number} expired
     * @param {string[]} scope
     * @param {string[]} theme
     * @param {string} equipe
     * @memberof User
     */
    setDataFromAPI(token:string,token_type:string,expired:number, scope:string[], theme:string[] , equipe:string){
        this._token = token;
        this._tokentype = token_type;
        this._expired = expired;
        this._rightRead = new Apireturn(scope[0]);
        this._rightWrite = new Apireturn(scope[1]);
        this._equipe = new Apireturn(equipe);
        //alert(this._rightRead + " " + this._rightWrite);
        for (let i in theme){
            this._themeAcc.push(new Apireturn(theme[i]));
            this.getinfoForCode(theme[i],i)
        }
    }

    /**
     * Get all the information of a code into the properties _themeAcc
     * @param {string} theme the code of the theme to get all of his info
     * @param {string} rank the rankl of the list _themeAcc
     * @memberof User
     */
    getinfoForCode(theme:string, rank:string){
        let json:string ='';
        let data:any;
        data = this._conn.connexionAPI(this.gettoken(),json,this.constructUrl(urlGetCode,theme),'Get');
        this._themeAcc[rank].setRemaining(data.id_liste_code,data.nom,data.desc_en,data.desc_fr);
    }

    //build the list of working unit 
    /**
     * build the object for the working unit id and setting the theme in front for the mocking
     * and set a list for the dropdown list int the forms.
     * @param {string} theme the theme selected by the user
     * @returns return a list of working unit id with a name and a value for a dropdownlist
     * @memberof User
     */
    setidUTtheme(theme:string){
        //json file
        let json:string = "";
        //set the new url and get the connection 
        let output:any =this._conn.connexionAPI(this.gettoken(), json, this.constructUrl(urlgetidWu + theme), 'Get');
        this._idUt = new idWu(theme,output.value);
        //À enlever Mocking Only
        for(let j in this._idUt._wUnit){
            this._idUt._wUnit[j] = this._idUt._theme + ' - ' + this._idUt._wUnit[j];
        }
        let list=[];
        for(let j in this._idUt._wUnit){
            list.push( { name: this._idUt._wUnit[j], value: this._idUt._wUnit[j]});
        }
        return list;    
    }

    //build a list of workingtype
    /**
     * build the list for the working type and
     * and set a list for the dropdown list int the forms.
     * @param {string} theme the theme selected by the user
     * @returns return a list of working type name with a name and a value for a dropdownlist
     * @memberof User
     */
    setworkingtype(theme:string){
        //json file
        let json:string = "";
        //set the new url and get the connection
        let output:any =this._conn.connexionAPI(this.gettoken(), json, this.constructUrl(urlWorkingType + theme), 'Get');
        
        for(let j in output){
            this._workinType.push(new Apireturn(output[j].id));
            this._workinType[j].setRemaining(output[j].id_list_code, output[j].nom,output[j].desc_en, output[j].desc_fr);
        }
        let list=[];
        for(let j in this._workinType){
            list.push( { name: this._workinType[j]._nom, value: this._workinType[j]._id});
        }
        return list;
    }

    /**
     * create a json file for getting a list of classes 
     * mostly hardcoded.
     * @param {string} theme the theme selected by the user
     * @returns {string} return a raw json
     * @memberof User
     */
    createJsonRessources(theme:string/*, path:string */):string{
        let output:any = {
            "fichiers" : theme,
            "chemin_recherche":[
                "ressources/liste_classes"
            ] 
        };

        let json:any = JSON.stringify(output)
        return json 
    }

    /**
     * the call to get the classes needed from the API 
     * @param {string} theme the theme selected by the user
     * @memberof User
     */
    getlistofclasses(theme:string/*,path:string*/){
        let listS = [];
        theme = theme + ':ress.json'
        let json = this.createJsonRessources(theme/*,path */);
        let data:any = this._conn.connexionAPI(this.gettoken(), json , this.constructUrl(urlClassesList),'GET');
        this._classeslist = data.value.liste_classe;
        for(let i in this._classeslist){
            listS.push( { name: this._classeslist[i] , wanted: false });
        }
        return listS
    }

    /**
     *Création d'un geoJson pour envoyer la geométrie d'un polygone
     * @memberof planifier
     */
    createGeoJson(value:any){
        let geojson:any = {
            "type" : value.type,
            "crs" : {
                "type" : "name",
                "properties" : {
                    "name" : value.spacialReference
                }
            },
            "Coordinates" : [
                [
                    value.ring
                ]
            ]
        };
        return geojson;
    }

    //accessor
    /*Username */
    getusername(): string {
        return this._username;
    }
    setusername(value: string) {
        this._username = value;
    }

    /*Password */
    getpassword(): string {
        return this._password;
    }
    setpassword(value: string) {
        this._password = value;
    }

    /*Conn */
    getconn(): connexion {
        return this._conn;
    }
    setconn(value: connexion) {
        this._conn = value;
    }

    /*Token */
    gettoken(): string {
        return this._token;
    }
    settoken(value: string) {
        this._token = value;
    }

    /*Tokentype */
    gettokentype(): string {
        return this._tokentype;
    }
    settokentype(value: string) {
        this._tokentype = value;
    }

    /*Expired */
    getexpired(): number {
        return this._expired;
    }
    setexpired(value: number) {
        this._expired = value;
    }

    /* RightRead*/
    getrightRead(): string {
        return this._rightRead._nom;
    }
    setrightRead(value: string) {
        this._rightRead._nom = value;
    }

    /*RightWrite */
    getrightWrite(): string {
        return this._rightWrite._nom;
    }
    setrightWrite(value: string) {
        this._rightWrite._nom = value;
    }
    //List de theme
    getthemeAcc(): Apireturn[] {
        return this._themeAcc;
    }

    getAllThemeNAme():string{
        let output:string;
        output = this.getthemeAcc()[0]._nom;
        for(let i in this.getthemeAcc()){
            if( i != '0')
            output += '<div>' +this.getthemeAcc()[i]._nom + '</div>'
        }
        return output;
    }

    setthemeAcc(value: string) {
        this._themeAcc[0]._nom = value;
    }

    //liste d' environnement
    getenvAcc(): Environnement[] {
        return this._envAcc;
    }
    setenvAcc(value: Environnement[]) {
        this._envAcc = value;
    }

}