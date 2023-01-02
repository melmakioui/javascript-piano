import { Idioma } from "../model/Idioma.js";

export class GoogleService {

    static _instance;
    _LANGUAGES = "https://theteacher.codiblau.com/piano/nologin/google/translate/languages";
    _TRANSLATE = "https://theteacher.codiblau.com/piano/nologin/google/translate";


    static getInstance() {
        return !this._instance ?
            new GoogleService() :
            this._instance;
    }

    async getIdiomes(){
        const fetchIdiomes = await fetch(this._LANGUAGES,{method:'POST'});
        const idiomes = await fetchIdiomes.json()   ;
        return idiomes.map(idioma => Idioma.fromJSON(idioma));
    }

    async traduir(origen,desti,traduir){
    
        const fetchIdiomes = await fetch(this._TRANSLATE,{method:'POST', body: JSON.stringify({
            languageFrom: origen,
            languageTo: desti,
            text: traduir
        })});
        const resultat = await fetchIdiomes.text();
        return resultat;
    }
}