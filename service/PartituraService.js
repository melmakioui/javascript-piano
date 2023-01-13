import { Partitura } from "../model/Partitura.js";
import { Nota } from "../model/Nota.js";

/*
* Com que no tenim notes a les partitures que arriben del servidor, 
* importare unes partitures meves.
*/

import { partitures as partituresStatic } from "../utils/PartituresStatic.js"


export class PartituraService {

    static _instance;
    _cerca = [];
    _partitures = [];
    _URL = "https://theteacher.codiblau.com";

    _contructor() { }

    static getInstance() {
        return !this._instance ?
            new PartituraService() :
            this._instance;
    }

    async getPartitures() {
        const fetchPartitures = await fetch(this._URL + "/piano/nologin/score/list", 
        { method: 'POST' });
        
        const partitures = await fetchPartitures.json();
    
        this._partitures = partitures.map(partitura => {
            const notes = partitura.notes.map(nota =>{
                if(nota.nom === "DO_AGUT") nota.nom = "DO7";
                nota.alteracio = (nota.alteracio === "SOSTINGUT");
                return Nota.fromJSON(nota)
            }).sort((a, b) => a.ordre - b.ordre);

            partitura.notes = notes;
            return Partitura.fromJSON(partitura);
        });
        return this._partitures;
    }

    async delete(id) {
        const fetchDelete = await fetch(this._URL + "/piano/nologin/score/delete",
            { method: 'POST', body: JSON.stringify({ id: id }) });

        const deleted = await fetchDelete.json();
        return deleted;
    }

    async getPartituraById(id) {
        const fetchPartitura = await fetch(this._URL + "/piano/nologin/score/get",
            { method: 'POST', body: JSON.stringify({ id: id }) });

        const partitura = await fetchPartitura.json();
        return Partitura.fromJSON(partitura);
    }

    async save(partitura) {
        const fetchPartitura = await fetch(this._URL + "/piano/nologin/score/save",
            { method: 'POST', body: JSON.stringify({ score: partitura }) });

        const novaPartitura = await fetchPartitura.json();
        return novaPartitura;
    }

    addCerca(input) {
        this._cerca = [];
        const notes = input
            .split(" ")
            .forEach(nota => this._cerca.push(nota));

        const notesString = this._cerca.join(" ");
        return this.cercador(notesString);
    }

    cercador(input) {
        //Nomes amb s'array de partitures estatic per que tenen notes.
        const notesString = partituresStatic.filter(({ notes }) => {
            return notes.map(nota => nota.nom)
                .join(" ")
                .includes(input.toUpperCase());
        })

        const find = this._partitures.filter(partitura => {
            return partitura.titol.toUpperCase().includes(input.toUpperCase())
        });

        return [...notesString, ...find];
    }

}