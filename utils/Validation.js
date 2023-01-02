export function validaTitol(event) {
    const THREEWORDS = /(\S{1,}\s{1,}){3,}/;
    const input = event.currentTarget;
    esTitolValid = THREEWORDS.test(input.value);
    pinta(input, esTitolValid);
}

export function validaCodiHTML(event) {
    const HTMLCODE = /(\<\w*)((\s\/\>)|(.*\<\/\w*\>))/;
    const input = event.currentTarget;
    console.log(input.value);
    esCodiHtmlValid = HTMLCODE.test(input.value);
    pinta(input, esCodiHtmlValid);
}

function pinta(input, result) {
    if (!result) input.style.backgroundColor = "rgb(254, 55, 55)";
    else input.style.backgroundColor = "white";
}



