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
        this.cerca.push(novaNota);
    }

    /*
    Explicacio de l'asgorisme
    1. Per a cada partitura mir l'array de notes si existeix un subconjunt de l'array que s'esta cercant.
    2. Variables "i","j" que seran els dos punters que aniran iterant cada element SIMULTANIAMENT.
    4. Si l'element de l'array de partitura[i] es igual a s'element de cerca[j] incrementam i,j.
    5. Si no son iguals increment la variable "i" per començar pel següent element de l'array de partitures, "j" torna a 0 per tornar a iterar la cerca de 0.
    6. Si "j" ha iterat tots els elements de l'array de cerca significa que els elements de cerca han estat compatibles amb x elements de l'array de partitures, 
    seguidament es pujara la melodia a un array resultats.
    7. Variables "i","j" tornen a 0 per mirar si existeix un subconjunt de la següent partitura.
    8. Finalment es retorna l'array de resultats, ja iterat totes les partitures. 
    */
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

    this.autoPlay = function(evt){
        var piano = new Piano()
        var boto = evt.currentTarget;
        var partitura = boto.notes;
        console.log(partitura);
        // piano.autoPlay(notes)
    }

    this.mostraResultats = function(){
        var aside = document.querySelector('.resultats');
        var resultats = this.cercaPartitura();

        for (var resultat of resultats) 
        {
            var div = document.createElement('div');
            div.setAttribute('class','reproduir');
            aside.appendChild(div);

            var p = document.createElement('p');
            p.innerHTML = `${resultat.titol}`;
            div.appendChild(p);

            var boto = document.createElement('button');
            boto.setAttribute('class','play-btn')
            boto.innerHTML = `REPRODUIR CANÇO`;
            boto.addEventListener('click',this.autoPlay);
            boto.notes = resultat.notes;
            div.appendChild(boto);
        }
    }
}

//Array de partitures per la cerca de melodies.
var partitures = [];
var laBalanguera = new Partitura("La Balanguera",["DO", "RE", "MI", "FA", "FA", "SOL", "SOL", "LA#", "LA#"]);
var happyBirthday = new Partitura("Happy BirthDay", ["DO", "DO", "RE", "DO", "FA", "MI", "DO", "DO", "RE", "DO", "SOL", "FA"]);
partitures.push(laBalanguera);
partitures.push(happyBirthday);


/* --PROCESS-- */
//Cerca de la partitura
var cercador = new Cercador(partitures);
//Cerca
cercador.addCerca("DO");
cercador.addCerca("RE");
cercador.addCerca("MI");
//Genera Botons
cercador.mostraResultats();