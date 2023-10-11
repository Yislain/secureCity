const express = require('express');
const router = express.Router();
const mysql = require('mysql2');

// Configura la conexión a la base de datos
const connection = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: '', // Deja la contraseña en blanco
  database: 'SECURECITY2', // Reemplaza 'securecity' con el nombre de tu base de datos local
  port: 3306,
});

// Ruta para editar un usuario
router.post('/editar/:id', (req, res) => {
  const userId = req.params.id;
  const { nombre, correo, contrasena } = req.body;

  // Realiza la actualización en la base de datos utilizando una consulta SQL o el método correspondiente
  const updateQuery = 'UPDATE USUARIOS SET nombre = ?, correo = ?, contrasena = ? WHERE id = ?';

  connection.query(updateQuery, [nombre, correo, contrasena, userId], (err, result) => {
    if (err) {
      console.error('Error al editar el usuario:', err);
      res.status(500).send('Error interno del servidor');
    } else {
      res.redirect('/cuenta');
    }
  });
});

// Ruta para eliminar un usuario
router.post('/eliminar/:id', (req, res) => {
  const userId = req.params.id;

  // Realiza la eliminación en la base de datos utilizando una consulta SQL o el método correspondiente
  const deleteQuery = 'DELETE FROM USUARIOS WHERE id = ?';

  connection.query(deleteQuery, [userId], (err, result) => {
    if (err) {
      console.error('Error al eliminar el usuario:', err);
      res.status(500).send('Error interno del servidor');
    } else {
      res.redirect('/');
    }
  });
});

module.exports = router;
