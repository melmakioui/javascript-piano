"use strict"
import { PartituraService } from "../../service/PartituraService.js";

export async function submit(event) {
    event.preventDefault();

    if (isValidForm()) return

    const form = event.currentTarget;
    const formData = new FormData(form);

    const data = Object.fromEntries(formData);
    data.notes = [];

    const partituraService = PartituraService.getInstance();
    const result = await partituraService.save(data);

    if (result.notifyType === "SUCCESS")
        window.location.href = "partitures.html";
}

function isValidForm() {
    const threeWordsPattern = /^\W*(\w+\b\W*){3,}$/;
    const input = document.querySelector('#titol');
    const validTitle = threeWordsPattern.test(input.value);
    const isDescriptionEmpty = tinymce.get("partituraoriginal").getContent() === '';
    const result = !validTitle || isDescriptionEmpty;

    if (result) displayError(!validTitle, isDescriptionEmpty);
    return result;
}

function displayError(validTitle, isDescriptionEmpty) {
    const alert = document.querySelector("#alert");
    const input = document.querySelector('#titol')
    const tinymceBody = tinymce.get("partituraoriginal").getBody();

    if (validTitle) {
        alert.innerHTML = "El titol ha de tenir un minim de tres paraules."
        input.style.backgroundColor = "rgb(254, 55, 55)";
    } else input.style.backgroundColor = "rgb(255,255,255)";

    if (isDescriptionEmpty) {
        tinymceBody.style.backgroundColor = "rgb(254, 55, 55)"
        alert.innerHTML = "El camp 'lletra' no pot esta buida."
    } else tinymceBody.style.backgroundColor = "rgb(255,255,255)";


    if (validTitle && isDescriptionEmpty) {
        tinymceBody.style.backgroundColor = "rgb(254, 55, 55)";
        tinymceBody.style.backgroundColor = "rgb(254, 55, 55)"
        alert.innerHTML = "El camps no poden estar buits."
    }

    alert.style.display = "block";
}





