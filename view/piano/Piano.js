import { Tecla } from "./Tecla.js";

export class Piano {

    constructor() {
        this.tecles = [];
        this.notes = ["do", "do-sust", "re", "re-sust", "mi", "fa", "fa-sust", "sol", "sol-sust", "la", "la-sust", "si", "do7"];

        this.notes.forEach(nota => {
            const audio = `${nota}.mp3`;
            const esSostingut = nota.includes("sust");
            this.tecles.push(new Tecla(audio, esSostingut));
        });
        this.injectaAudio();
        this.activaTecles();
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

    activaTecles() {
        const teclesDOM = document.querySelectorAll('.tecla');
        const tecles = ['A', 'W', 'S', 'E', 'D', 'F', 'T', 'G', 'Y', 'H', 'U', 'J', 'K'];

        teclesDOM.forEach((teclaDOM, index) => {
            document.addEventListener('keydown', e => {
                if (e.code === `Key${tecles[index]}`) teclaDOM.click();
            })
        });
    }

    //TODO: Autoplay fins que les notes siguine visibles

}