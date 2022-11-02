function Partitura(titol,notes){
    this.titol = titol;
    this.notes = notes;
}

function Nota(nota,sostingut){
    this.nota = nota;
    this.sostingut = sostingut;
}

function Cercador(partitures) {
    this.partitures = partitures;
    this.cerca = [];

    this.addCerca = function (nota) {
        var esSostingut = nota.includes("#");
        var novaNota = new Nota(nota, esSostingut);
        this.cerca.push(novaNota)
    }

    this.cercaPartitura = function () {
        var i = 0;
        var j = 0;
        var resultats = [];

        for (var melodia of this.partitures) {
            while (i < melodia.notes.length && j < this.cerca.length) {
                if (melodia.notes[i] === this.cerca[j].nota) {
                    i++;
                    j++;
                    if (j === this.cerca.length)
                        resultats.push(melodia);
                } else {
                    i = i - j + 1;
                    j = 0;
                }
            }
            i = 0;
            j = 0;
        }
        return resultats;
    }
}

var partitures = [];
var laBalanguera = new Partitura("La Balanguera",["DO", "RE", "MI", "FA", "FA", "SOL", "SOL", "LA#", "LA#"]);
var happyBirthday = new Partitura("Happy BirthDay", ["DO", "DO", "RE", "DO", "FA", "MI", "DO", "DO", "RE", "DO", "SOL", "FA"]);
partitures.push(laBalanguera);
partitures.push(happyBirthday);

var cercador = new Cercador(partitures);

cercador.addCerca("DO");
cercador.addCerca("DO");

console.log(cercador.cercaPartitura());