const express = require('express');
const router = express.Router();
const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'aws.connect.psdb.cloud',
  user: 'yplrvnqfr97i3v9vvgbc',
  password: 'pscale_pw_ToGCOvzBy9itWonhR1q1Oi8wsHnkI6UK1WxKmuit9EL',
  database: 'securecity',
  port: 3306,
  ssl: {
    rejectUnauthorized: false,
  },
});

connection.connect((err) => {
  if (err) {
    console.error('Error al conectar a la base de datos:', err);
  } else {
    console.log('Conexión exitosa a la base de datos');
  }
});

router.get('/adminpanel', (req, res) => {
  if (req.session.userId && req.session.isAdmin) {
    const query = 'SELECT * FROM USUARIOS';
    connection.query(query, (err, usuarios) => {
      if (err) {
        console.error('Error al obtener usuarios:', err);
        res.status(500).send('Error interno del servidor');
      } else {
        res.render('adminpanel', { usuarios });
      }
    });
  } else {
    res.redirect('/bienvenida');
  }
});

router.get('/adminpanel/editarusuario/:id', (req, res) => {
  const userId = req.params.id;

  if (!userId || isNaN(userId)) {
    return res.status(400).send('ID de usuario inválido');
  }

  const query = 'SELECT * FROM USUARIOS WHERE id = ?';
  connection.query(query, [userId], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Error interno del servidor');
    }

    if (results.length === 0) {
      return res.status(404).send('Usuario no encontrado');
    }

    res.render('editarUsuario', { usuario: results[0] });
  });
});

router.post('/adminpanel/editarusuario/:id', (req, res) => {
  const userId = req.params.id;

  if (!userId || isNaN(userId)) {
    return res.status(400).send('ID de usuario inválido');
  }

  const { nombre, correo, contrasena } = req.body;

  if (!nombre || !correo || !contrasena) {
    return res.status(400).send('Faltan campos obligatorios');
  }

  if (!req.session.userId || !req.session.isAdmin) {
    return res.status(401).send('No autorizado');
  }

  // Sanear inputs y realizar la actualización en la base de datos
  const query = 'UPDATE USUARIOS SET nombre = ?, correo = ?, contrasena = ? WHERE id = ?';

  connection.query(query, [nombre, correo, contrasena, userId], (err) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Error interno del servidor');
    }
    res.redirect('/adminpanel');
  });
});

router.get('/adminpanel/eliminarusuario/:id', (req, res) => {
  const userId = req.params.id;

  if (!userId || isNaN(userId)) {
    return res.status(400).send('ID de usuario inválido');
  }

  if (!req.session.userId || !req.session.isAdmin) {
    return res.status(401).send('No autorizado');
  }

  const query = 'DELETE FROM USUARIOS WHERE id = ?';
  connection.query(query, [userId], (err) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Error interno del servidor');
    }
    res.redirect('/adminpanel');
  });
});

router.post('/adminpanel/insertarusuario', (req, res) => {
  const { nombre, correo, contrasena } = req.body;

  if (!nombre || !correo || !contrasena) {
    return res.status(400).send('Faltan campos obligatorios');
  }

  if (!req.session.userId || !req.session.isAdmin) {
    return res.status(401).send('No autorizado');
  }

  // Sanear inputs y realizar la inserción en la base de datos
  const query = 'INSERT INTO USUARIOS (nombre, correo, contrasena) VALUES (?, ?, ?)';

  connection.query(query, [nombre, correo, contrasena], (err) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Error interno del servidor');
    }

    res.redirect('/adminpanel');
  });
});

module.exports = router;
