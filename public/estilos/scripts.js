// Obtener el botón de usuario y el contenedor de opciones de usuario
const iconoUsuario = document.querySelector(".icono-usuario");
const opcionesUsuario = document.querySelector(".opciones-usuario");
// Mostrar las opciones de usuario al hacer clic en el botón
iconoUsuario.addEventListener("click", () => {
  opcionesUsuario.classList.toggle("mostrar");
});

// Ocultar las opciones de usuario al hacer clic en cualquier lugar fuera de ellas
document.addEventListener("click", (event) => {
  if (!opcionesUsuario.contains(event.target) && !iconoUsuario.contains(event.target)) {
    opcionesUsuario.classList.remove("mostrar");
  }
});

// Función para programar el ocultamiento de las opciones con un pequeño retraso
function scheduleHideOpcionesUsuario() {
  setTimeout(() => {
    if (!iconoUsuario.matches(":hover") && !opcionesUsuario.matches(":hover")) {
      opcionesUsuario.classList.remove("mostrar");
    }
  }, 200);
}

// Desplazamiento suave al hacer clic en el botón "Más información"
document.querySelector('.boton-scroll').addEventListener('click', (event) => {
  event.preventDefault();
  const section = document.getElementById('mas-informacion');
  section.scrollIntoView({ behavior: 'smooth' });
});
