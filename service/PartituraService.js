import { Partitura } from "../model/Partitura.js";

export class PartituraService {

    static _instance;
    _cerca = [];
    _SAVE = "https://theteacher.codiblau.com/piano/nologin/score/save";
    _LIST = "https://theteacher.codiblau.com/piano/nologin/score/list";
    _GET = "https://theteacher.codiblau.com/piano/nologin/score/get";
    _DELETE = "https://theteacher.codiblau.com/piano/nologin/score/delete"

    static getInstance() {
        return !this._instance ?
            new PartituraService() :
            this._instance;
    }

    async getPartitures() {
        const fetchPartitures = await fetch(this._LIST, { method: 'POST' });
        const partitures = await fetchPartitures.json();
        return partitures.map(partitura => Partitura.fromJSON(partitura));
    }

    async delete(id) {
        const fetchDelete = await fetch(this._DELETE, { method: 'POST', body: id });
        const deleted = await fetchDelete.json();
        return deleted;
    }

    async getPartituraById(id) {
        const fetchPartitura = await fetch(this._GET, { method: 'POST', body: JSON.stringify({ id: id }) });
        const partitura = await fetchPartitura.json();
        return Partitura.fromJSON(partitura);
    }

    async save(partitura) {
        const fetchPartitura = await fetch(this._SAVE, { method: 'POST', body: JSON.stringify({ score: partitura }) });
        const novaPartitura = await fetchPartitura.json();
        return novaPartitura;
    }

    addCerca(data) {
        
    }

    cercador() {

    }

}