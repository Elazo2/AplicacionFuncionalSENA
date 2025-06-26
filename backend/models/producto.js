const mongoose = require('mongoose');
const { Schema } = mongoose;

const ProductoSchema = new Schema({
  nombre: { type: String, required: true },
  categoria: { type: String },
  precio: { type: Number }
});

module.exports = mongoose.model('Producto', ProductoSchema);
