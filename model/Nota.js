export class Nota {
    constructor(id,nom,alteracio,ordre) {
        this.id = id;
        this.nom = nom;
        this.alteracio = alteracio;
        this.ordre = ordre;
    }

    static fromJSON(nota) {
        return {
            id: nota.idnota,
            nom: nota.nom,
            alteracio: nota.alteracio,
            ordre: nota.ordre
        }
    }
}