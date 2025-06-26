const User = require('../models/user');
const authCtrl = {};

// Registrar usuario
authCtrl.register = async (req, res) => {
  const user = new User(req.body);
  await user.save();
  res.json({ status: 'Usuario registrado' });
};

// Login básico
authCtrl.login = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user || user.password !== password) {
    return res.status(401).json({ message: 'Credenciales inválidas' });
  }
  res.json({ message: 'Autenticación exitosa' });
};

module.exports = authCtrl;
