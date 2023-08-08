const express = require('express');
const mysql = require('mysql2');
const router = express.Router();

// Conexión a la base de datos MySQL en PlanetScale sin verificar el certificado del servidor
const connection = mysql.createConnection({
  host: 'aws.connect.psdb.cloud',
  user: 'vbiz8g8854qottjm3gqy',
  password: 'pscale_pw_afX6lQtaUDa7fEbndzIgyteD3z34hiNwRPylT7oWgtv',
  database: 'securecity',
  port: 3306,
  ssl: {
    rejectUnauthorized: false, // Establecer esta opción en false para evitar la verificación del certificado
  },
});

connection.connect((err) => {
  if (err) {
    console.error('Error al conectar a la base de datos:', err);
  } else {
    console.log('');
  }
});

// Ruta para el panel de administración
router.get('/adminpanel', (req, res) => {
  if (req.session.userId && req.session.isAdmin) {
    const usuario = { id: 123 }; // Reemplaza con el ID real del usuario
    res.render('adminpanel', { usuario });
  } else {
    res.redirect('/bienvenida');
  }
});

router.get('/adminpanel/editarusuarios/:id', (req, res) => {
  const usuarioId = req.params.id;
  if (req.session.userId && req.session.isAdmin) {
    const query = 'SELECT * FROM USUARIOS WHERE id = ?';
    connection.query(query, [usuarioId], (err, results) => {
      if (err) {
        console.error('Error al obtener usuario:', err);
        res.status(500).send('Error interno del servidor');
      } else {
        res.render('editarUsuario', { usuario: results[0] });
      }
    });
  } else {
    res.redirect('/bienvenida');
  }
});

router.post('/adminpanel/editarusuarios/:id', (req, res) => {
  const usuarioId = req.params.id;
  const { nombre, correo, contrasena } = req.body;
  if (req.session.userId && req.session.isAdmin) {
    const query = 'UPDATE USUARIOS SET nombre = ?, correo = ?, contrasena = ? WHERE id = ?';
    connection.query(query, [nombre, correo, contrasena, usuarioId], (err) => {
      if (err) {
        console.error('Error al actualizar usuario:', err);
        res.status(500).send('Error interno del servidor');
      } else {
        res.redirect('/adminpanel'); // Redirige al panel de administración después de la edición
      }
    });
  } else {
    res.redirect('/bienvenida');
  }
});

// Otras rutas de administrador aquí

module.exports = router;
