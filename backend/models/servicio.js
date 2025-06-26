const mongoose = require('mongoose');
const { Schema } = mongoose;

const ServicioSchema = new Schema({
  nombre: { type: String, required: true },
  descripcion: { type: String },
  precio: { type: Number }
});

module.exports = mongoose.model('Servicio', ServicioSchema);
