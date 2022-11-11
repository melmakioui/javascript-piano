function Partitura(titol, notes) {
    this.titol = titol;
    this.notes = notes;
}

function Nota(nota, sostingut) {
    this.nota = nota;
    this.sostingut = sostingut;
}

function Cercador(partitures) {
    this.partitures = partitures;
    this.cerca = [];
    this.partituresTrobades = [];
    this.piano = new Piano();

    this.init = function () {
        var cercador = document.querySelector('#cercador');
        cercador.addEventListener('input', this.addCerca);
    }

    this.addCerca = function (evt) {
        this.cerca = [];
        var arrayNotes = evt.currentTarget.value.split(" ");

        for (var nota of arrayNotes) {
            var esSostingut = nota.includes("#");
            var novaNota = new Nota(nota.toUpperCase(), esSostingut);
            this.cerca.push(novaNota);
        }
        this.cercaPartitura();
        this.pintaResultats();

    }.bind(this)

    this.cercaPartitura = function () {
        var subconjunt;
        this.partituresTrobades = [];

        for (var partitura of this.partitures) {
            for (let i = 0; i < partitura.notes.length + 1; i++) {
                for (let j = 1 + i; j < this.cerca.length + 1 + i; j++) {
                    subconjunt = partitura.notes.slice(i, j);
                }
                              
                if (this.sonIguals(this.cerca, subconjunt)) {
                    this.partituresTrobades.push(partitura);
                    break;
                }
            }
        }
    }

    this.sonIguals = function (cerca, partitura) {
        if (cerca.length !== partitura.length) return false;

        for (var i = 0; i < cerca.length; i++)
            if (cerca[i].nota !== partitura[i]) return false;

        return true;
    }

    this.pintaResultats = function () {
        var divResultats = document.querySelector('.resultats');
        divResultats.innerHTML = "";
        var resultats = this.partituresTrobades;

        for (var resultat of resultats) {
            var div = document.createElement('div');
            div.setAttribute('class', 'reproduir');
            divResultats.appendChild(div);

            var p = document.createElement('p');
            p.innerHTML = `${resultat.titol}`;
            div.appendChild(p);

            var boto = document.createElement('button');
            boto.setAttribute('class', 'play-btn')
            boto.innerHTML = `REPRODUIR CANÇO`;
            boto.addEventListener('click', this.autoPlay);
            boto.notes = resultat.notes;
            div.appendChild(boto);
        }
    }

    this.autoPlay = function (evt) {
        var boto = evt.currentTarget;
        var partitura = boto.notes;
        this.piano.autoPlay(partitura, boto);
    }.bind(this)
}

// //Array de partitures per la cerca de melodies.
var partitures = [];
var laBalanguera = new Partitura("La Balanguera", ["DO", "RE", "MI", "FA", "FA", "SOL", "SOL", "LA#", "LA#"]);
var happyBirthday = new Partitura("Happy BirthDay", ["DO", "DO", "RE", "DO", "FA", "MI", "DO", "DO", "RE", "DO", "SOL", "FA"]);
var prova = new Partitura("Prova", ["DO", "RE", "MI", "DO", "DO", "RE", "MI", "DO", "MI", "FA", "SOL", "FA"]);

partitures.push(laBalanguera);
partitures.push(happyBirthday);
partitures.push(prova);

var cercador = new Cercador(partitures);
cercador.init();


/*
    @@@@Explicacio de l'asgorisme
    1. Per a cada partitura mir l'array de notes si existeix un subconjunt de l'array que s'esta cercant.
    2. Variables "i","j" que seran els dos punters que aniran iterant cada element SIMULTANIAMENT.
    4. Si l'element de l'array de partitura[i] es igual a s'element de cerca[j] incrementam i,j.
    5. Si no son iguals increment la variable "i" per començar pel següent element de l'array de partitures, "j" torna a 0 per tornar a iterar la cerca de 0.
    6. Si "j" ha iterat tots els elements de l'array de cerca significa que els elements de cerca han estat compatibles amb x elements de l'array de partitures,
    seguidament es pujara la melodia a un array resultats.
    7. Variables "i","j" tornen a 0 per mirar si existeix un subconjunt de la següent partitura.
    8. Finalment es retorna l'array de resultats, ja iterat totes les partitures.
   */


/*
    @@@@@Explicacio de la cerca
    1. Cada vegada que escric dins l'input envia els valors a addCerca.
    2. Dins addCerca buit l'array cerca, despres faig us  del metode "split" per que me separi els strings i me retorni l'array d'strings
    3. Dins el for si l'string es menor que 2 (DO..RE) no el fic dins l'array de cerca
    4. En cas de que sigui menor que 2 el fic dins l'array de cerca i despres en mostra els resultats
*/

// function Partitura(titol, notes) {
//     this.titol = titol;
//     this.notes = notes;
// }

// const cerca = ["DO", "DO","RE","DO"];
// var newArr;
// var arrrs = []
// for (var partitura of partitures) {

//     for (let i = 0; i < partitura.notes.length + 1; i++) {
//         for (let j = 1 + i; j < cerca.length + 1 + i; j++) {
//             newArr = partitura.notes.slice(i, j);
//         }
//         if (arraysMatch(cerca, newArr)) {
//             arrrs.push(partitura);
//             break
//         }
//     }
// }

// console.log(arrrs);


// function arraysMatch(arr1, arr2) {

//     // Check if the arrays are the same length
//     if (arr1.length !== arr2.length) return false;

//     // Check if all items exist and are in the same order
//     for (var i = 0; i < arr1.length; i++)
//         if (arr1[i] !== arr2[i]) return false;

//     // Otherwise, return true
//     return true;
// };