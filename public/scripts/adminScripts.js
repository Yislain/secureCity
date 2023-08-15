// Capturar los elementos del DOM
const insertarUsuarioBtn = document.getElementById('insertarUsuario');
const editarBotones = document.querySelectorAll('.btn-editar');
const eliminarBotones = document.querySelectorAll('.btn-eliminar');
const cerrarModalBtns = document.querySelectorAll('.modal-close');

// Función para mostrar un modal
function mostrarModal(modalId) {
  const modal = document.getElementById(modalId);
  modal.style.display = 'block';
}

// Función para cerrar todos los modales
function cerrarModales() {
  const modales = document.querySelectorAll('.modal');
  modales.forEach((modal) => {
    modal.style.display = 'none';
  });
}

// Agregar evento de clic para mostrar el modal de inserción de usuario
if (insertarUsuarioBtn) {
  insertarUsuarioBtn.addEventListener('click', () => {
    cerrarModales();
    mostrarModal('modal');
  });
}

// Agregar evento de clic para mostrar el modal de edición de usuario
editarBotones.forEach((boton) => {
  boton.addEventListener('click', (event) => {
    const usuarioId = event.target.getAttribute('data-id');
    const editarModal = document.getElementById('editarModal');
    const editarIdInput = editarModal.querySelector('#editarId');
    editarIdInput.value = usuarioId;
    cerrarModales();
    mostrarModal('editarModal');
  });
});

// Agregar evento de clic para mostrar el modal de eliminación de usuario
eliminarBotones.forEach((boton) => {
  boton.addEventListener('click', (event) => {
    const usuarioId = event.target.getAttribute('data-id');
    const eliminarModal = document.getElementById('eliminarModal');
    const eliminarIdInput = eliminarModal.querySelector('#eliminarId');
    eliminarIdInput.value = usuarioId;
    cerrarModales();
    mostrarModal('eliminarModal');
  });
});

// Agregar eventos de clic para cerrar los modales al hacer clic en el botón de cerrar
cerrarModalBtns.forEach((boton) => {
  boton.addEventListener('click', () => {
    cerrarModales();
  });
});
