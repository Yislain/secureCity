const express = require('express');
const mysql = require('mysql2');
const router = express.Router();

// Conexión a la base de datos MySQL en PlanetScale sin verificar el certificado del servidor
const connection = mysql.createConnection({
  host: 'aws.connect.psdb.cloud',
  user: '9c1p9ydfu0oi3xjlwc9g',
  password: 'pscale_pw_Q6Zy9YO4PbSxeJ9cON8C9vl7FzFC8iA9j8MPEkK4pYx',
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
    const usuario = { id: 16 }; // Reemplaza con el ID real del usuario
    res.render('adminpanel', { usuario });
  } else {
    res.redirect('/bienvenida');
  }
});

router.get('/adminpanel/editarusuarios/:id', (req, res) => {
  console.log("kajdsfh");
  const usuarioId = req.params.id;
  if (req.session.userId && req.session.isAdmin) {
    const query = 'SELECT * FROM USUARIOS WHERE id = ?';
    connection.query(query, [usuarioId], (err, results) => {
      if (err) {
        console.error('Error al obtener usuario:', err);
        res.status(500).send('Error interno del servidor');
      } else {
        console.log(results[0]);

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
