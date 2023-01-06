export class Idioma {
    constructor(id,nom) {
        this.id = id;
        this.nom = nom;
    }

    static fromJSON(idioma) {
        return {
            id: idioma.code,
            nom: idioma.name
        }
    }
}