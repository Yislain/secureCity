// Obtener la sección de la imagen de fondo y el encabezado
const imagenFondo = document.querySelector(".slider");
const encabezado = document.querySelector(".encabezado");
const barraBotones = document.querySelector(".barra-botones");
const textoImagen = document.querySelector(".texto-imagen");

// Función para ajustar el efecto de desvanecimiento de la imagen
function ajustarDesvanecer() {
    const alturaVentana = window.innerHeight;
    const distanciaDesdeArriba = imagenFondo.getBoundingClientRect().top;

    // Calcular la opacidad en función de la posición de la imagen de fondo en la ventana
    const opacidad = 1 - distanciaDesdeArriba / alturaVentana;
    imagenFondo.style.opacity = opacidad;

    // Resaltar el texto a medida que se desvanece la imagen
    encabezado.classList.toggle("resaltar", opacidad > 0.5);
    textoImagen.style.opacity = opacidad;
}

// Agregar un evento al desplazarse para ajustar el desvanecimiento
window.addEventListener("scroll", ajustarDesvanecer);

// Ajustar la posición de la barra de botones al bajar y subir en la página
function ajustarBarraBotones() {
    const distanciaDesdeArriba = barraBotones.getBoundingClientRect();

    // Obtener la altura del encabezado
    const alturaEncabezado = encabezado.offsetHeight;

    if (distanciaDesdeArriba <= alturaEncabezado) {
        barraBotones.classList.add("barra-fija");
    } else {
        barraBotones.classList.remove("barra-fija");
    } 
}

// Agregar un evento al desplazarse para ajustar la posición de la barra de botones
window.addEventListener("scroll", ajustarBarraBotones);