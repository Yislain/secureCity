const express = require('express');
const session = require('express-session');
const path = require('path');

const adminRoutes = require('./adminRoutes');
const cuentaRouter = require('./cuenta');

const app = express();

// Configuración del motor de plantillas EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '..', 'views'));

// Middleware para servir archivos estáticos (CSS, imágenes, etc.)
app.use(express.static(path.join(__dirname, '..', 'public')));

// Configuración de la sesión
app.use(
  session({
    secret: 'tu_secreto_aqui',
    resave: true,
    saveUninitialized: true,
  })
);

// Rutas de cuenta
app.use('/cuenta', cuentaRouter);

// Rutas generales
app.get('/', (req, res) => {
  res.render('index', { usuario: req.session.user });
});

// Rutas adicionales (puedes agregar más según tus necesidades)
app.get('/inicio', (req, res) => {
  res.render('index');
});

app.get('/index-session', (req, res) => {
  res.render('index-session');
});

app.get('/reportadelito-session', (req, res) => {
  res.render('reportadelito-session');
});

app.get('/nosotros-session', (req, res) => {
  res.render('nosotros-session');
});

app.get('/prevencion-session', (req, res) => {
  res.render('prevencion-session');
});

app.get('/login', (req, res) => {
  res.render('login', { registroExitoso: false });
});

app.get('/reportadelito', (req, res) => {
  res.render('reportadelito');
});

app.get('/prevencion', (req, res) => {
  res.render('prevencion');
});

app.get('/nosotros', (req, res) => {
  res.render('nosotros');
});

app.get('/registro', (req, res) => {
  res.render('registro', { registroExitoso: false });
});

app.get('/cuenta', (req, res) => {
  const userId = req.session.userId;
  if (userId) {
    // Simulación de consulta a la base de datos
    const usuario = { nombre: 'Nombre del Usuario' };
    res.render('cuenta', { usuario });
  } else {
    res.redirect('/login');
  }
});

app.post('/registro', (req, res) => {
  // Código de registro sin conexión a base de datos
  const { nombre, correo, contrasena } = req.body;
  // Puedes agregar lógica adicional aquí sin interactuar con la base de datos
  const usuario = { nombre };
  req.session.userId = 123;
  res.render('bienvenida', { usuario });
});

app.post('/login', (req, res) => {
  // Código de inicio de sesión sin conexión a base de datos
  const { correo, contrasena } = req.body;
  // Puedes agregar lógica adicional aquí sin interactuar con la base de datos
  req.session.userId = 123; // Establece un ID de usuario ficticio
  res.redirect('/bienvenida');
});

// Ruta de bienvenida
app.get('/bienvenida', (req, res) => {
  const userId = req.session.userId;
  if (userId) {
    const usuario = { nombre: 'Nombre del Usuario' };
    res.render('bienvenida', { usuario });
  } else {
    res.redirect('/login');
  }
});

// Implementa la ruta para cerrar sesión
app.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error('Error al cerrar sesión:', err);
    }
    res.redirect('/');
  });
});

// Usar las rutas de administrador
app.use('/', adminRoutes);

// Inicia el servidor en el puerto definido por 'port' variable
const port = process.env.PORT || 4200;
app.listen(port, () => {
  console.log(`Servidor iniciado en http://localhost:${port}`);
});
