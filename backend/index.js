const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const mongoose = require('./database');

const app = express();
app.set('port', process.env.PORT || 3000);

// Middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(cors({ origin: '*' })); // Puedes restringirlo si tienes frontend definido

// Rutas
app.use('/api/auth', require('./routes/usuario.routes')); // login, registro, etc.
app.use('/api/usuarios', require('./routes/usuarioCRUD.routes'));
app.use('/api/productos', require('./routes/producto.routes'));
app.use('/api/servicios', require('./routes/servicio.routes'));

// Modelos
const Usuario = require('./models/usuario');
const Producto = require('./models/producto');
const Servicio = require('./models/servicio');

// Crear colecciones si no existen
async function initCollections() {
  try {
    await Usuario.createCollection();
    await Producto.createCollection();
    await Servicio.createCollection();
  } catch (error) {
    console.error('Error al crear colecciones:', error);
  }
}

initCollections();

// Iniciar servidor
app.listen(app.get('port'), () => {
  console.log(`Servidor activo en el puerto ${app.get('port')}`);
});
