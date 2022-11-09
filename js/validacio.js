var titol = document.querySelector('input[type="text"]');
var idioma = document.querySelector('select');
var texteOriginal = document.querySelector('.original');
var texteTraduccio = document.querySelector(".traduccio")
var button = document.querySelector('input[type="submit"]');
var form = document.querySelector('form');

titol.addEventListener('input', validaTitol);
texteOriginal.addEventListener('input', validaCodiHtml);
texteTraduccio.addEventListener('input', validaCodiHtml);
form.addEventListener('submit', check)
window.addEventListener('load', resetetja);

var validTitol = false;
var validTexte = false;

function resetetja() {
    form.reset();
}

function validaTitol() {
    var pattern = /(\S{1,}\s{1,}){3,}/;
    var match = pattern.test(titol.value);

    pinta(match, titol);

    validTitol = match;
}

function validaCodiHtml(event) {

    var target = event.currentTarget;
    var pattern = /(\<\w*)((\s\/\>)|(.*\<\/\w*\>))/;
    var match = pattern.test(target.value);

    pinta(match, target);

    validTexte = match;
}

function check(event) {
    if (idioma.value === "ca")
        if (texteOriginal.value !== texteTraduccio.value)
            event.preventDefault();

    if (!validTitol || !validTexte)
        event.preventDefault();
}


function pinta(match, input) {
    if (match) input.style.backgroundColor = "white";
    else input.style.backgroundColor = "red";
}