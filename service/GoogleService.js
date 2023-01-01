import { Idioma } from "../model/Idioma.js";

export class GoogleService {

    static _instance;
    _LANGUAGES = "https://theteacher.codiblau.com/piano/nologin/google/translate/languages";


    static getInstance() {
        return !this._instance ?
            new GoogleService() :
            this._instance;
    }

    async getIdiomes(){
        const fetchIdiomes = await fetch(this._LANGUAGES,{method:'POST'});
        const idiomes = await fetchIdiomes.json();
        return idiomes.map(idioma => Idioma.fromJSON(idioma));
    }
}