
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

}