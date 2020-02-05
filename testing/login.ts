import { urlLoginGet, urlgetidWu } from './config/url';
import { connexion } from './apiConnect';
import { idWu } from './manager/idWU';


export class login{

    /** Send to APi **/
    _username: string = 'hello';
    _password: string = 'hello';
    _environnement: string = '';
    _conn: connexion = new connexion();
    
    /** Return of login **/
    _token: string;
    _tokentype: string;
    _expired: number = 3600;
    _rightRead: string;
    _rightWrite: string;

    /** Dropdown List **/
    _themeAcc: string[];
    _envAcc: string[] = ['Dev', 'Tst', 'Pro'];
    _idUt:idWu[] = [];
    
    

    //Constructor with only username and pasword for the login
    constructor(username?:string, password?:string){
        this._username =  username;
        this._password = password;
    }

    //submit the from to the API
    submitForm():any{
        //To Change
             //create a json and save the file in the download folder 
         let header:any = this.getInformationToHeader();
         let data:any = this._conn.connexionAPILogin(urlLoginGet,header);
         //alert(data.access_token);
         if (!data.code){
            this.setDataFromAPI(data.access_token,data.token_type,data.expired, data.scope ,data.theme);
        }else{
            alert(data.code)
        }
         return data;
             
    };

    //get the infromation out of the form into a string json
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
    setDataFromAPI(token:string,token_type:string,expired:number, scope:string[], theme:string[]){
        this._token = token;
        this._tokentype = token_type;
        this._expired = expired;
        this._rightRead = scope[0];
        this._rightWrite = scope[1];
        this._themeAcc = theme
        //alert(this._rightRead + " " + this._rightWrite);
        this.setidUTtheme();
    }

    //build the list of working unit 
    setidUTtheme(){
        let list:string[] = this.getthemeAcc();
        let json:string = "";
        for (let i in list) {
            this._idUt[i] = new idWu(list[i],list);
            let newUrl = urlgetidWu + list[i]
            let output:any =this._conn.connexionAPI(this.gettoken(), json, newUrl, 'Get');
            //console.log(output.value);
            
            this._idUt[i]._wUnit = output.value;
        }
        for(let i in this._idUt){
            for(let j in this._idUt[i]._wUnit){
                this._idUt[i]._wUnit[j] = this._idUt[i]._theme + ' - ' + this._idUt[i]._wUnit[j];
            } 
        }  
    }

    setidUtToDDL(theme:string):any{
        /*let listtest = {
            hydro_50k : [{name:'', value:''},{name:'', value:''},{name:'', value:''}],
            corint_250k : [{name:'', value:''},{name:'', value:''},{name:'', value:''}]
        };*/

        let list = []
        let rank:any;

        for (let i in this._themeAcc){
            if (this._themeAcc[i] === theme){
                rank = i;
            }
        }
            
        for(let j in this._idUt[rank]._wUnit){
                list.push({name: this._idUt[rank]._wUnit[j], value: this._idUt[rank]._wUnit[j]});
        } 
        
        return list;
    }

    //Return a list of a theme selected
    getUtravail(theme:string):string[]{
        for (let i in this._idUt){
            if (this._idUt[i].getTheme() == theme){
                return this._idUt[0]._wUnit
            }
        }
        let ret:string[] = ['No value'];
        return ret;
        
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
        return this._rightRead;
    }
    setrightRead(value: string) {
        this._rightRead = value;
    }

    /*RightWrite */
    getrightWrite(): string {
        return this._rightWrite;
    }
    setrightWrite(value: string) {
        this._rightWrite = value;
    }
    //List de theme
    getthemeAcc(): string[] {
        return this._themeAcc;
    }
    setthemeAcc(value: string[]) {
        this._themeAcc = value;
    }

    //liste d' environnement
    getenvAcc(): string[] {
        return this._envAcc;
    }
    setenvAcc(value: string[]) {
        this._envAcc = value;
    }

}