const UsuarioCRUD = require('../models/usuarioCRUD');

const crearUsuario = async (req, res) => {
  try {
    const nuevoUsuario = new UsuarioCRUD(req.body);
    await nuevoUsuario.save();
    res.status(201).json({ mensaje: 'Usuario creado correctamente' });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al crear usuario', error });
  }
};

const obtenerUsuarios = async (req, res) => {
  const usuarios = await UsuarioCRUD.find();
  res.json(usuarios);
};

const actualizarUsuario = async (req, res) => {
  await UsuarioCRUD.findByIdAndUpdate(req.params.id, req.body);
  res.json({ mensaje: 'Usuario actualizado' });
};

const eliminarUsuario = async (req, res) => {
  await UsuarioCRUD.findByIdAndDelete(req.params.id);
  res.json({ mensaje: 'Usuario eliminado' });
};

module.exports = {
  crearUsuario,
  obtenerUsuarios,
  actualizarUsuario,
  eliminarUsuario
};
