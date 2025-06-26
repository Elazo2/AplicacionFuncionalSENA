const mongoose = require('mongoose');

const URI = 'mongodb://localhost:27017/api_usuarios'; // Cambiamos el nombre de la base de datos

mongoose.connect(URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('Conectado a la base de datos: api_usuarios'))
  .catch(err => console.error('Error al conectar con MongoDB:', err));

module.exports = mongoose;
