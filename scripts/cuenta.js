const express = require('express');
const router = express.Router();

// Ruta para editar un usuario
router.post('/editar/:id', (req, res) => {
  const userId = req.params.id;
  const { nombre, correo, contrasena } = req.body;

  // Simulación de actualización de usuario por ID (sin conexión a la base de datos)
  res.redirect('/cuenta');
});

// Ruta para eliminar un usuario
router.post('/eliminar/:id', (req, res) => {
  const userId = req.params.id;

  // Simulación de eliminación de usuario por ID (sin conexión a la base de datos)
  res.redirect('/');
});

module.exports = router;
