function Tecla(so,sostingut){
    this.so = so;
    this.sostingut = sostingut;
}

function Piano(){
    this.tecles = [];
    this.notes = ["do","do-sust","re","re-sust","mi","fa","fa-sust","sol","sol-sust","la","la-sust","si","do7"];

    this.init = function(){
        for (var nota of this.notes)
        {
            var audio = nota + ".mp3"
            var esSostingut = nota.includes("sust");
            this.tecles.push( new Tecla(audio,esSostingut));
        }
        this.injectaAudio();
    }

    this.injectaAudio = function(){
        var tecles = document.querySelectorAll('.tecla');
    
        var idx = 0;
        for (var tecla of this.tecles)
        {
            var audio = document.createElement('audio');
            audio.setAttribute('src',`/assets/audio/${tecla.so}`);
            tecles[idx].addEventListener('click',this.play);
            tecles[idx].audio = audio; // afageix una propietat audio per poder reproduirla a la funcio activa tecla
            tecles[idx].appendChild(audio);
            idx++;
        }
    }

    this.play = function(evt){
        evt.stopPropagation();
        var tecla = evt.currentTarget;
        var audio = tecla.audio;
        audio.currentTime = 0;
        audio.play();
    }

    this.autoPlay = function(partitura,botoReproduir){

    }
}

var piano = new Piano();

piano.init();