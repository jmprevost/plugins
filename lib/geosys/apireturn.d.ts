export declare class Apireturn {
    _id: string;
    _idListeCode: string;
    _nom: string;
    _descEn: string;
    _descFr: string;
    /**
     *Creates an instance of Apireturn with only an id
     * @param {string} id id of the response of the API
     * @memberof Apireturn
     */
    constructor(id: string);
    /**
     * when a call to the API is done with the code. this will set the remaining of the information
     * @param {string} idListCode a code for a list
     * @param {string} nom the name in the db
     * @param {string} descEn english description
     * @param {string} descFr french description
     * @memberof Apireturn
     */
    setRemaining(idListCode: string, nom: string, descEn: string, descFr: string): void;
}