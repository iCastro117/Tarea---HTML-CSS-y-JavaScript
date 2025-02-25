// Lista para almacenar los elementos agregados
var elementosAgregados = [];

function actualizarOrden() {
    var titulo = elementosAgregados.find(el => el.dataset.tipo === "titulo");
    var parrafo = elementosAgregados.find(el => el.dataset.tipo === "parrafo");
    var enlaces = elementosAgregados.filter(el => el.dataset.tipo === "enlace");
    var imagen = elementosAgregados.find(el => el.tagName === "IMG");

    var baseTop = 100;

    if (titulo) {
        titulo.style.top = baseTop + "px";

        baseTop += titulo.offsetHeight + 20;
    }

    if (parrafo) {
        parrafo.style.top = baseTop + "px";
        baseTop += parrafo.offsetHeight + 20;
    }

    enlaces.forEach((enlace, index) => {
        enlace.style.top = baseTop + "px";
        baseTop += enlace.offsetHeight + 20;
    });

    if (imagen) {
        var extraSubBox = document.querySelector(".extraSub-box");

    }
}


function crearCampoEntrada(tipo) {
    var contenidoBox = document.querySelector('.contenido-box');
    var inputExistente = document.getElementById("entradaTexto");
    if (inputExistente) inputExistente.remove();

    var botonExistente = document.getElementById("botonAgregar");
    if (botonExistente) botonExistente.remove();

    var ultimaPosicion = contenidoBox.offsetTop + 80;
    var primerElementoTexto = elementosAgregados.find(el => el.tagName === "DIV");

    if (primerElementoTexto) {
        var ultimoElementoTexto = [...elementosAgregados].reverse().find(el => el.tagName === "DIV");
        ultimaPosicion = ultimoElementoTexto.offsetTop + ultimoElementoTexto.offsetHeight + 40;
    }

    var contenedorFormulario = document.createElement("div");
    contenedorFormulario.id = "formularioEntrada";
    contenedorFormulario.style.position = "absolute";
    contenedorFormulario.style.left = (contenidoBox.offsetLeft + contenidoBox.offsetWidth - 980) + "px";
    contenedorFormulario.style.top = ultimaPosicion + "px";
    contenedorFormulario.style.background = "white";
    contenedorFormulario.style.padding = "10px";
    contenedorFormulario.style.boxShadow = "0px 5px 15px rgba(0, 0, 0, 0.3)";
    contenedorFormulario.style.borderRadius = "10px";

    var inputTexto = document.createElement("input");
    inputTexto.type = "text";
    inputTexto.id = "entradaTexto";
    inputTexto.placeholder = tipo === "enlace" ? "Ingrese la URL" : "Escribe aquí...";
    inputTexto.style.display = "block";
    inputTexto.style.margin = "5px 0";
    inputTexto.style.padding = "5px";

    var botonAgregar = document.createElement("button");
    botonAgregar.innerText = "Agregar";
    botonAgregar.id = "botonAgregar";
    botonAgregar.style.display = "block";
    botonAgregar.style.marginTop = "10px";
    botonAgregar.style.padding = "5px";
    botonAgregar.style.cursor = "pointer";

    botonAgregar.onclick = function() {
        var texto = inputTexto.value.trim();
        if (texto === "") {
            alert("Por favor, escribe algo antes de agregar.");
            return;
        }

        var resultadoBox = document.createElement("div");
        resultadoBox.style.position = "absolute";
        resultadoBox.style.left = contenedorFormulario.style.left;
        resultadoBox.style.top = contenedorFormulario.style.top;
        resultadoBox.style.width = "300px";
        resultadoBox.style.minHeight = "80px";
        resultadoBox.style.background = "white";
        resultadoBox.style.padding = "15px";
        resultadoBox.style.boxShadow = "0px 5px 15px rgba(0, 0, 0, 0.3)";
        resultadoBox.style.borderRadius = "10px";
        resultadoBox.style.display = "flex";
        resultadoBox.style.flexDirection = "column";
        resultadoBox.style.justifyContent = "center";
        resultadoBox.dataset.tipo = tipo;

        if (tipo === "enlace") {
            var etiqueta = document.createElement("p");
            etiqueta.style.fontWeight = "bold";
            etiqueta.style.marginBottom = "5px";
            etiqueta.innerText = "Enlace:";

            var enlace = document.createElement("a");
            enlace.href = texto;
            enlace.target = "_blank";
            enlace.innerText = texto;
            enlace.style.textDecoration = "none";
            enlace.style.color = "rgb(0, 123, 255)";
            enlace.style.fontWeight = "bold";
            enlace.style.fontSize = "16px";

            resultadoBox.appendChild(etiqueta);
            resultadoBox.appendChild(enlace);
        } else {
            var etiqueta = document.createElement("p");
            etiqueta.style.fontWeight = "bold";
            etiqueta.style.marginBottom = "5px";
            etiqueta.innerText = tipo === "titulo" ? "Título:" : "Párrafo:";

            var contenidoTexto = document.createElement("p");
            contenidoTexto.innerText = texto;
            contenidoTexto.style.fontSize = "16px";
            contenidoTexto.style.margin = "0";

            resultadoBox.appendChild(etiqueta);
            resultadoBox.appendChild(contenidoTexto);
        }

        document.body.appendChild(resultadoBox);
        elementosAgregados.push(resultadoBox);
        contenedorFormulario.remove();
    };

    contenedorFormulario.appendChild(inputTexto);
    contenedorFormulario.appendChild(botonAgregar);
    document.body.appendChild(contenedorFormulario);
}

function nuevoTitulo() {
    crearCampoEntrada("titulo");
}

function nuevoParrafo() {
    crearCampoEntrada("parrafo");
}

function nuevoEnlace() {
    crearCampoEntrada("enlace");
}

/*
function nuevoTitulo() {
    // Selecciona el contenedor donde se agregará el título
    var contenidoBox = document.querySelector('.contenido-box'); 

    // Obtiene el valor del campo de texto con id "texto"
    var texto = document.getElementById("texto").value;

    // Crea un nuevo elemento <h1>
    var titulo = document.createElement("h1");

    // Asigna el texto ingresado al nuevo título
    titulo.innerText = texto;

    // Agrega el título al contenedor
    contenidoBox.appendChild(titulo);
}
*/

/*
function nuevoParrafo() {
    // Selecciona el contenedor donde se agregará el párrafo
    var contenidoBox = document.querySelector('.contenido-box');

    // Obtiene el valor del campo de texto con id "texto"
    var texto = document.getElementById("texto").value;

    // Crea un nuevo elemento <p>
    var parrafo = document.createElement("p");

    // Asigna el texto ingresado al nuevo párrafo
    parrafo.innerText = texto;

    // Agrega el párrafo al contenedor
    contenidoBox.appendChild(parrafo);
}
*/



function nuevaImagen() {
    var inputImagen = document.createElement("input");
    inputImagen.type = "file";
    inputImagen.accept = "image/*";

    inputImagen.onchange = function(evt) {
        var archivos = evt.target.files;
        if (archivos.length > 0) {
            var imagen = new FileReader();
            imagen.onload = function(e) {
                var etiquetaImg = document.createElement("img");
                etiquetaImg.src = e.target.result;
                etiquetaImg.style.width = "100%"; // Para que se adapte al ancho del contenedor
                etiquetaImg.style.height = "auto"; // Mantiene la proporción original

                // Selecciona el contenedor .extraSub-box
                var extraSubBox = document.querySelector('.extraSub-box');

                if (!extraSubBox) {
                    console.error("No se encontró el contenedor .extraSub-box");
                    return;
                }

                // Mostrar extraSub-box si estaba oculta
                extraSubBox.style.display = "block";

                // Agrega la imagen al contenedor .extraSub-box
                extraSubBox.innerHTML = ""; // Elimina contenido anterior (si se quiere solo una imagen)
                extraSubBox.appendChild(etiquetaImg);

                // Ajusta el margen superior con un mínimo de 300px
                extraSubBox.style.marginTop = "100px";

                // Agrega la imagen a la lista de elementos agregados
                elementosAgregados.push(etiquetaImg);
            };
            imagen.readAsDataURL(archivos[0]);
        }
    };
    inputImagen.click();
}






function imprimir() {
    console.log("Iniciando impresión...");
    console.log("Elementos agregados:", elementosAgregados);

    var ventanaImpresion = window.open('', '', 'height=600, width=800');
    ventanaImpresion.document.write('<html><head><title>Impresión</title>');
    ventanaImpresion.document.write('<link rel="stylesheet" type="text/css" href="styles.css">');
    ventanaImpresion.document.write('</head><body>');
    ventanaImpresion.document.write('<h1>Contenido de Botones</h1>');

    elementosAgregados.forEach(elemento => {
        console.log("Agregando elemento:", elemento);
        if (elemento.dataset.tipo === "titulo") {
            ventanaImpresion.document.write(`<div class="elemento"><h2>Título:</h2><p>${elemento.innerText.replace("Título:", "").trim()}</p></div>`);
        } else if (elemento.dataset.tipo === "parrafo") {
            ventanaImpresion.document.write(`<div class="elemento"><h3>Párrafo:</h3><p>${elemento.innerText.replace("Párrafo:", "").trim()}</p></div>`);
        } else if (elemento.tagName === "IMG") {
            ventanaImpresion.document.write(`<div class="elemento"><p><strong>Imagen agregada:</strong></p><img src="${elemento.src}" width="200"></div>`);
        } else if (elemento.tagName === "A") {
            ventanaImpresion.document.write(`<div class="elemento"><p><strong>Enlace:</strong></p><a class="enlace" href="${elemento.href}" target="_blank">${elemento.innerText}</a></div>`);
        }
    });

    ventanaImpresion.document.write('</body></html>');
    ventanaImpresion.document.close();

    setTimeout(() => {
        ventanaImpresion.print();
        ventanaImpresion.close();
    }, 500);
}



document.getElementById("imagen").addEventListener("change", function(event) {
    var archivo = event.target.files[0];
    if (archivo) {
        var lector = new FileReader();
        lector.onload = function(e) {
            var imagen = document.createElement("img");
            imagen.src = e.target.result;
            imagen.style.width = "100%"; // Ajusta el tamaño
            imagen.style.height = "auto";
            imagen.style.marginTop = "10px";


            var contenedor = document.getElementById("contenido");
            contenedor.innerHTML = ""; // Limpia contenido previo
            contenedor.appendChild(imagen);
        };
        lector.readAsDataURL(archivo);
    }
});