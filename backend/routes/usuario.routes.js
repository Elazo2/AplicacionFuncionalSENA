const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const Usuario = require('../models/usuario');

// Registrar usuario
router.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Verificar si el usuario ya existe
    const userExistente = await Usuario.findOne({ username });
    if (userExistente) return res.status(400).json({ mensaje: 'El usuario ya existe' });

    // Hashear la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    const nuevoUsuario = new Usuario({
      username,
      password: hashedPassword
    });

    await nuevoUsuario.save();
    res.status(201).json({ mensaje: 'Usuario registrado correctamente' });
  } catch (err) {
    res.status(500).json({ mensaje: 'Error al registrar el usuario', error: err });
  }
});

// Login (autenticación)
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    const usuario = await Usuario.findOne({ username });
    if (!usuario) return res.status(404).json({ mensaje: 'Usuario no encontrado' });

    const passwordValida = await bcrypt.compare(password, usuario.password);
    if (!passwordValida) return res.status(401).json({ mensaje: 'Contraseña incorrecta' });

    // Generar token JWT
    const token = jwt.sign(
      { user: { id: usuario._id } },
      'secretkey', // Debes cambiar esto por una variable de entorno en producción
      { expiresIn: '1h' }
    );

    res.json({ token });
  } catch (err) {
    res.status(500).json({ mensaje: 'Error en el login', error: err });
  }
});

// Obtener todos los usuarios (requiere tokens)
router.get('/', async (req, res) => {
  const usuarios = await Usuario.find();
  res.json(usuarios);
});

// Obtener un usuario por ID
router.get('/:id', async (req, res) => {
  const usuario = await Usuario.findById(req.params.id);
  res.json(usuario);
});

// Actualizar un usuario
router.put('/:id', async (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  await Usuario.findByIdAndUpdate(req.params.id, { username, password: hashedPassword });
  res.json({ mensaje: 'Usuario actualizado' });
});

// Eliminar un usuario
router.delete('/:id', async (req, res) => {
  await Usuario.findByIdAndDelete(req.params.id);
  res.json({ mensaje: 'Usuario eliminado' });
});

module.exports = router;
