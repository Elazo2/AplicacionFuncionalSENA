const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/usuario');

// Registro
router.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password)
      return res.status(400).json({ message: 'Faltan datos' });

    const existente = await Usuario.findOne({ username });
    if (existente)
      return res.status(400).json({ message: 'El usuario ya existe' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const nuevoUsuario = new Usuario({ username, password: hashedPassword });
    await nuevoUsuario.save();

    res.status(201).json({ message: 'Usuario registrado correctamente' });
  } catch (err) {
    res.status(500).json({ message: 'Error al registrar el usuario' });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const usuario = await Usuario.findOne({ username });
    if (!usuario)
      return res.status(404).json({ message: 'Usuario no encontrado' });

    const valido = await bcrypt.compare(password, usuario.password);
    if (!valido)
      return res.status(401).json({ message: 'Credenciales inválidas' });

    const token = jwt.sign({ id: usuario._id }, 'secretkey', { expiresIn: '1h' });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ message: 'Error en el login' });
  }
});

module.exports = router;
