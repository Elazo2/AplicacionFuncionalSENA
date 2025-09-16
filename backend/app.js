const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
require('./database'); // Conexión a Mongo

const Usuario = require('./models/usuario');
const Producto = require('./models/producto');
const Servicio = require('./models/servicio');

const app = express();
app.set('port', process.env.PORT || 3000);

app.use(morgan('dev'));
app.use(express.json());
app.use(cors({ origin: '*' }));

// Rutas
app.use('/api/auth', require('./routes/usuario.routes'));
app.use('/api/usuarios', require('./routes/usuarioCRUD.routes'));
app.use('/api/productos', require('./routes/producto.routes'));
app.use('/api/servicios', require('./routes/servicio.routes'));

// Crear colecciones si no existen (después de conectar)
(async () => {
  try {
    await Usuario.createCollection();
    await Producto.createCollection();
    await Servicio.createCollection();
  } catch (error) {
    console.error('Error al crear colecciones:', error);
  }
})();

module.exports = app; // 👈 ahora exportamos solo la app
