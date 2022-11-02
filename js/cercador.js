function Partitura(titol,notes){
    this.titol = titol;
    this.notes = notes;
}


function Nota(nota,sostingut){
    this.nota = nota;
    this.sostingut = sostingut;
}

function Cercador(partitures){
    this.partitures = partitures;
    this.cerca = [];

    this.addCerca = function (nota) {
        var esSostingut = nota.includes("#");

        var novaNota = new Nota(nota,esSostingut);
        this.cerca.push(novaNota)
    }

    this.cercaPartitura = function (){
         var i = 0;
         var j = 0;
         var resultats = [];

        for (var melodia of this.partitures) {
            while (i < melodia.partitura.length && j < this.cerca.length){
                i++;
                j++;
                if (j === this.cera.length){
                    resultats.push(canco);
                }else {
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