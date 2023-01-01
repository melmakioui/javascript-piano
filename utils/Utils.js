export function initTinyMCE() { //utils
    tinymce.init({
        selector: "textarea",
        plugins: [
            "insertdatetime"
        ],
        width: 700,
        height: 400,
    });
}

export function obrirLogin() {

}

export function getUrlParameter(value) {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    return urlParams.get(value);
}
