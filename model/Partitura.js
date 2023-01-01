export class Partitura {

    constructor(id,titol,idiomaOriginal,idiomaDesti,lletraOriginal,lletraDesti,notes) {
        this.id = id;
        this.titol = titol;
        this.idiomaOriginal = idiomaOriginal;
        this.idiomaDesti = idiomaDesti;
        this.lletraOriginal = lletraOriginal;
        this.lletraDesti = lletraDesti;
        this.notes = notes;
    }

    static fromJSON(partitura){
        return {
            id: partitura.idpartitura,
            titol: partitura.titol,
            idiomaOriginal: partitura.idiomaoriginal,
            idiomaDesti: partitura.idiomatraduccio,
            lletraOriginal: partitura.lletraoriginal,
            lletraTraduccio: partitura.lletratraduccio,
            notes: partitura.notes
        }
    }

}