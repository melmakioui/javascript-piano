var body = document.querySelector('body');
var div = document.querySelector(".content");
var table = document.createElement('table');
var thead = document.createElement('thead');
var tbody = document.createElement('tbody');
var contador = 0;
var files = 97;


table.appendChild(thead);
table.appendChild(tbody);

thead.innerHTML =
    `
<tr>
    <th>Titol</th>
    <th>Idioma Original</th>
    <th>Accions</th>
</tr>
`

tbody.innerHTML =
    `
        <tr>
                <td>Merry Christmas</td>
                <td>en</td>
                <td><i class="fa fa-pencil"> Editar</i>
                    <i class="fa fa-trash"> Esborrar</i>
                    </td>
                
        </tr>
        <tr>
                <td>La Balanguera</td>
                <td>ca</td>
                <td><i class="fa fa-pencil"> Editar</i>
                    <i class="fa fa-trash"> Esborrar</i>
                    </td>
                
        </tr>
        <tr>
                <td>Frère Jacques</td>
                <td>fr</td>
                <td><i class="fa fa-pencil"> Editar</i>
                    <i class="fa fa-trash"> Esborrar</i>
                    </td>
                
        </tr>`

while (contador < files) {

    var tr = document.createElement('tr');
    var titol = document.createElement('td');
    var idioma = document.createElement('td');
    var accions = document.createElement('td');

    titol.innerHTML = `Sant Antoni i el Dimoni`
    idioma.innerHTML = `ca`
    accions.innerHTML = `<i class="fa fa-pencil"> Editar</i>
                         <i onclick="esborrar(this)" class="fa fa-trash"> Esborrar</i>`
    tr.appendChild(titol);
    tr.appendChild(idioma);
    tr.appendChild(accions);
    tr.setAttribute('id',`${contador + 1}`);
    tbody.appendChild(tr);

    contador++;
}
div.appendChild(table);

function esborrar(element){
    var confirmacio = window.confirm(
        "'Està segur que vol esborrar l'element?"
    );

    if (confirmacio){
        element.parentNode.parentNode.remove();
        window.alert("S'ha eliminat la canço.");
    }else window.alert("Has cancel·lat l'acció.");

}

function obriLogin() {
    var width = 770;
    var height = 500;
    var top = (screen.height - 500) / 2;
    var left = (screen.width - 770) / 2;
    var login = window.open(
        "./login.html",
        "Log In",
        `width=${width},height=${height},top=${top},left=${left}`
    );
}
