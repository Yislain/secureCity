const express = require('express');
const session = require('express-session');
const mysql = require('mysql2');
const path = require('path');
const adminRoutes = require('./adminRoutes'); // Importa las rutas de administrador
const app = express();

// Configuración del motor de plantillas EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '..', 'views'));

// Middleware para servir archivos estáticos (CSS, imágenes, etc.)
app.use(express.static(path.join(__dirname, '..', 'public')));

// Configuración de la sesión
app.use(
  session({
    secret: 'tu_secreto_aqui', // Cambia a tu propio secreto
    resave: true,
    saveUninitialized: true,
  })
);



// Conexión a la base de datos MySQL en PlanetScale sin verificar el certificado del servidor
const connection = mysql.createConnection({
  host: 'aws.connect.psdb.cloud',
  user: 'udmki4o99dvjgb3nful7',
  password: 'pscale_pw_qYU23hqtYqy1o2xCBExVv8EC3rbizvz7LADsbXIipXQ',
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
    console.log('Conexión exitosa a MySQL');
  }
});

app.use(express.urlencoded({ extended: true }));

// Rutas generales
app.get('/', (req, res) => {
  res.render('index'); // Renderiza la página de inicio
});

app.get('/inicio', (req, res) => {
  res.render('index'); // Renderiza la página de inicio
});

app.get('/login', (req, res) => {
  res.render('login', { registroExitoso: false }); // Define el valor de registroExitoso
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
    // Consulta la base de datos para obtener los datos del usuario y pasarlos a la plantilla
    const usuario = { nombre: 'Nombre del Usuario' };
    res.render('cuenta', { usuario });
  } else {
    res.redirect('/login');
  }
});

app.post('/registro', (req, res) => {
  const { nombre, correo, contrasena } = req.body;
  const query = 'INSERT INTO USUARIOS (nombre, correo, contrasena) VALUES (?, ?, ?)';
  connection.query(query, [nombre, correo, contrasena], (err) => {
    if (err) {
      console.error('Error al registrar el usuario:', err);
      res.status(500).send('Error interno del servidor');
    } else {
      const usuario = { nombre };
      req.session.userId = 123;
      res.render('bienvenida', { usuario });
    }
  });
});

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
      req.session.userId = results[0].id;
      if (correo === 'admin' && contrasena === 'admin') {
        req.session.isAdmin = true;
        res.redirect('/adminpanel');
      } else {
        req.session.isAdmin = false;
        res.redirect('/bienvenida');
      }
    }
  });
});

app.get('/bienvenida', (req, res) => {
  const userId = req.session.userId;
  if (userId) {
    const usuario = { nombre: 'Nombre del Usuario' };
    res.render('bienvenida', { usuario });
  } else {
    res.redirect('/login');
  }
});

// Usar las rutas de administrador
app.use('/', adminRoutes);

// Inicia el servidor en el puerto definido por 'port' variable
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Servidor iniciado en http://localhost:${port}`);
});
