function Tecla(so, sostingut) {
    this.so = so;
    this.sostingut = sostingut;
}

function Piano() {
    this.tecles = [];
    this.notes = ["do", "do-sust", "re", "re-sust", "mi", "fa", "fa-sust", "sol", "sol-sust", "la", "la-sust", "si", "do7"];
    var autoReproductor;
    var initCronometre;

    this.init = function () {
        for (var nota of this.notes) {
            var audio = nota + ".mp3"
            var esSostingut = nota.includes("sust");
            this.tecles.push(new Tecla(audio, esSostingut));
        }
        this.injectaAudio();
    }

    this.injectaAudio = function () {
        var teclesDOM = document.querySelectorAll('.tecla');

        var idx = 0;
        for (var tecla of this.tecles) {
            var audio = document.createElement('audio');
            audio.setAttribute('src', `/assets/audio/${tecla.so}`);
            teclesDOM[idx].addEventListener('click', this.play);
            teclesDOM[idx].audio = audio;
            teclesDOM[idx].appendChild(audio);
            idx++;
        }
    }

    this.play = function (evt) {
        evt.stopPropagation();
        var tecla = evt.currentTarget;
        var audio = tecla.audio;
        audio.currentTime = 0;
        audio.play();
    }

    this.autoPlay = function (partitura, botoAutoPlay) {
        var tecles = this.preparaPartitura(partitura);
        var idx = 0;
        var data = botoAutoPlay.innerHTML;

        clearInterval(initCronometre);
        var crono = new Cronometre(botoAutoPlay, data);
        initCronometre = crono.init();

        clearInterval(autoReproductor);
        autoReproductor = setInterval(function () {
            if (idx === tecles.length - 1) {
                clearInterval(autoReproductor);
                crono.stop();
            }
            tecles[idx].click();
            idx++;
        }, 1000);
    }

    this.preparaPartitura = function (partitura) {
        var tecles = document.querySelectorAll('.tecla');
        var notes = [];
        var teclesPartitura = [];

        for (var tecla of tecles)
            notes.push(tecla.getAttribute("data-note"));

        for (var nota of partitura) {
            var idx = notes.indexOf(nota);
            teclesPartitura.push(tecles[idx]);
        }
        return teclesPartitura;
    }
}

var piano = new Piano();
piano.init();
