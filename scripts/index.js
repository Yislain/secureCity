const express = require('express');
const session = require('express-session'); 
const mysql = require('mysql2');
const app = express();
const path = require('path');
require("dotenv").config();

// Configuración del motor de plantillas EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '..', 'views'));

// Middleware para servir archivos estáticos (CSS, imágenes, etc.)
app.use(express.static(path.join(__dirname, '..', 'public')));

// Configuración de la sesión
app.use(session({
  secret: process.env.SESSION_SECRETO,
  resave: true,
  saveUninitialized: true
}));

// Conexión a la base de datos MySQL
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE
});

connection.connect((err) => {
  if (err) {
    console.error('Error al conectar a la base de datos:', err);
  } else {
    console.log('Conexión exitosa a MySQL');
  }
});

// Ruta para la página de inicio
app.get('/', (req, res) => {
  res.render('index'); // Renderiza la página de inicio
});

// Ruta para la página de inicio
app.get('/inicio', (req, res) => {
  res.render('index'); // Renderiza la página de inicio
});

// Ruta para la página de inicio de sesión
app.get('/login', (req, res) => {
  res.render('login');
});

// Ruta para la página de reporte de delito
app.get('/reportadelito', (req, res) => {
  res.render('reportadelito');
});

// Ruta para la página de prevención
app.get('/prevencion', (req, res) => {
  res.render('prevencion');
});

// Ruta para la página "Nosotros"
app.get('/nosotros', (req, res) => {
  res.render('nosotros'); // Renderiza la página "nosotros"
});

// Ruta para la página de registro
app.get('/registro', (req, res) => {
  res.render('registro');
});

// Manejo del formulario de registro
app.post('/registro', (req, res) => {
  const { nombre, correo, contrasena } = req.body;
  const query = 'INSERT INTO USUARIOS (nombre, correo, contrasena) VALUES (nombre, correo, contrasena)';
  connection.query(query, [nombre, correo, contrasena], (err) => {
    if (err) {
      console.error('Error al registrar el usuario:', err);
      res.status(500).send('Error interno del servidor');
    } else {
      res.redirect('/inicio'); // Redirige a la página de inicio o a donde desees
    }
  });
});

// Manejo del formulario de inicio de sesión
app.post('/login', (req, res) => {
  const { correo, contrasena } = req.body;
  const query = 'SELECT id FROM USUARIOS WHERE correo = ? AND contrasena = ?';
  connection.query(query, [correo, contrasena], (err, results) => {
    if (err) {
      console.error('Error al iniciar sesión:', err);
      res.status(500).send('Error interno del servidor');
    } else if (results.length === 0) {
      res.status(401).send('Credenciales incorrectas');
    } else {
      req.session.userId = results[0].id; // Guarda el ID del usuario en la sesión
      res.redirect('/inicio'); // Redirige a la página de inicio o a donde desees
    }
  });
});

// Inicia el servidor en el puerto definido por 'port' variable
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Servidor iniciado en http://localhost:${port}`);
});
