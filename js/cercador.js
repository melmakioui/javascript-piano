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

    }.bind(this);

    this.cercaPartitura = function () {
        var subconjunt;
        this.partituresTrobades = [];

        for (var partitura of this.partitures) {
            for (let i = 0; i < partitura.notes.length + 1; i++) {

                for (let j = 1 + i; j < this.cerca.length + 1 + i; j++)
                    subconjunt = partitura.notes.slice(i, j);

                if (this.sonIguals(this.cerca, subconjunt, partitura))
                    break;
            }
        }
    }

    this.sonIguals = function (cerca, subconjunt, partitura) {
        if (cerca.length !== subconjunt.length) return false;

        for (var i = 0; i < cerca.length; i++)
            if (cerca[i].nota !== subconjunt[i]) return false;

        this.partituresTrobades.push(partitura)
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
            boto.repro = boto.innerHTML; //Despres del cronometre torna el boto com era.
            boto.addEventListener('click', this.autoPlay);
            boto.notes = resultat.notes;
            div.appendChild(boto);
        }
    }

    this.autoPlay = function (evt) {
        var boto = evt.currentTarget;
        var partitura = boto.notes;
        this.piano.autoPlay(partitura, boto);
    }.bind(this);
}

//Array de partitures per la cerca de melodies.
var partitures = [];
var laBalanguera = new Partitura("La Balanguera", ["DO", "RE", "MI", "FA", "FA", "SOL", "SOL", "LA#", "LA#"]);
var happyBirthday = new Partitura("Happy BirthDay", ["DO", "DO", "RE", "DO", "FA", "MI", "DO", "DO", "RE", "DO", "SOL", "FA"]);
var prova = new Partitura("Prova", ["DO", "RE", "MI", "DO#", "DO", "RE", "MI", "DO", "MI", "FA", "SOL", "FA"]);

partitures.push(laBalanguera);
partitures.push(happyBirthday);
partitures.push(prova);

//Inicialització
var cercador = new Cercador(partitures);
cercador.init();