import { GoogleService } from "../../service/GoogleService.js";

export function initTinyMCE() { //utils
    tinymce.init({
        selector: "textarea",
        plugins: [
            "insertdatetime"
        ],
        width: 700,
        height: 400,

        init_instance_callback: function (editor) {
            editor.on('input', async function(event){
                const idioma = document.querySelector('select');
                const partituratraduccio = document.querySelector('#partituratraduccio');
                const input = event.target.innerText;
            
                if(idioma.value === 'ca'){
                    partituratraduccio.value = input.value;
                    return;
                }
            
                const googleService = GoogleService.getInstance();
                console.log(idioma.value,'ca',input.value);
                const resultat = await googleService.traduir(idioma.value,'ca',input);
                partituratraduccio.value = resultat;
            });
            
        },
    });
}

export function obrirLogin() {
    const loginBtn = document.querySelector('#obrirlogin');
    loginBtn.addEventListener('click',()=> {
        const width = 770;
        const height = 500;
        const top = (screen.height - 500) / 2;
        const left = (screen.width - 770) / 2;
        const login = window.open(
            "./login.html",
            "Log In",
            `width=${width},height=${height},top=${top},left=${left}`
        );
    })

}

export function getUrlParameter(value) {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    return urlParams.get(value);
}
