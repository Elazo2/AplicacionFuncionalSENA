const usuario = require('../models/usuario');
const authCtrl = {};

// Registrar usuario
authCtrl.register = async (req, res) => {
  const usuario = new Usuario(req.body);
  await usuario.save();
  res.json({ status: 'Usuario registrado' });
};

// Login básico
authCtrl.login = async (req, res) => {
  const { username, password } = req.body;
  const usuario = await Usuario.findOne({ username });
  if (!user || usuario.password !== password) {
    return res.status(401).json({ message: 'Credenciales inválidas' });
  }
  res.json({ message: 'Autenticación exitosa' });
};

module.exports = authCtrl;
