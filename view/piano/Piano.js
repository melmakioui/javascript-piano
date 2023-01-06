import { Tecla } from "./Tecla.js";
import { Cronometre } from "../crono/Cronometre.js";

export class Piano {

    constructor() {
        this.interval;
        this.tecles = [];
        this.notes = ["do", "do-sust", "re", "re-sust", "mi", "fa", "fa-sust", "sol", "sol-sust", "la", "la-sust", "si", "do7"];

        this.notes.forEach(nota => {
            const audio = `${nota}.mp3`;
            const esSostingut = nota.includes("sust");
            this.tecles.push(new Tecla(audio, esSostingut));
        });
        this.injectaAudio();
        this.activaTecles();
        this.crono = new Cronometre();
    }


    injectaAudio() {
        const teclesDOM = document.querySelectorAll('.tecla');

        this.tecles.forEach((tecla, idx) => {
            const audio = document.createElement('audio');
            audio.setAttribute('src', `/assets/audio/${tecla.so}`);
            teclesDOM[idx].addEventListener('click', this._play);
            teclesDOM[idx].audio = audio;
            teclesDOM[idx].appendChild(audio);
        });
    }

    _play(event) {
        event.stopPropagation();
        const tecla = event.currentTarget;
        const audio = tecla.audio;
        audio.currentTime = 0;
        audio.play();
    }

    autoPlay(DOMElement, partitura) {
        this._stopAutoPlay();
        const teclesDOM = document.querySelectorAll('.tecla');
        const tecles = [...teclesDOM].map(teclaDOM => teclaDOM.getAttribute("data-note"));
        const partituraAutoPlay = partitura.map(partitura => partitura.nom);
        const autoPlay = partituraAutoPlay.map(nota => tecles.indexOf(nota));
        const display = DOMElement.display;

        this.crono.setDisplay(DOMElement)
        this.crono.reset()
        this.crono.start()

        let idx = 0;
        this.interval = setInterval(() => {
            if (idx === autoPlay.length - 1) {
                this._stopAutoPlay()
                this.crono.stop();
                DOMElement.innerHTML = display;
            }
            teclesDOM[autoPlay[idx]].click();
            idx++;
        }, 1000)
    }

    _stopAutoPlay() {
        clearInterval(this.interval);
    }

    activaTecles() {
        const teclesDOM = document.querySelectorAll('.tecla');
        const tecles = ['A', 'W', 'S', 'E', 'D', 'F', 'T', 'G', 'Y', 'H', 'U', 'J', 'K'];

        teclesDOM.forEach((teclaDOM, index) => {
            document.addEventListener('keydown', e => {
                if (e.code === `Key${tecles[index]}`) teclaDOM.click();
            })
        });
    }



}