const express = require('express');
const session = require('express-session'); // Agrega esta línea
const app = express();
const path = require('path');
require("dotenv").config();

app.use(session({
  secret: process.env.SESSION_SECRETO,
  resave: true,
  saveUninitialized: true
}));

var port = process.env.PORT || 3000;

// Configuración del motor de plantillas EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '..', 'views'));

// Middleware para servir archivos estáticos (CSS, imágenes, etc.)
app.use(express.static(path.join(__dirname, '..', 'public')));

// Ruta para la página de inicio
app.get('/', (req, res) => {
  res.render('index'); // Renderiza la página de inicio
});

app.get('/login', (req, res) => {
  res.render('login');
});

app.get('/registro', (req, res) => {
  res.render('registro');
});

// Ruta para la página "Nosotros"
app.get('/nosotros', (req, res) => {
  res.render('nosotros'); // Renderiza la página "nosotros"
});

// Inicia el servidor en el puerto definido por 'port' variable
app.listen(port, () => {
  console.log(`Servidor iniciado en http://localhost:${port}`);
});
