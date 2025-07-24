const express = require('express');
const router = express.Router();
const usuariosCtrl = require('../controllers/usuarios.controller');

// Rutas del CRUD (no login)
router.post('/', usuariosCtrl.crearUsuario);
router.get('/', usuariosCtrl.obtenerUsuarios);
router.put('/:id', usuariosCtrl.actualizarUsuario);
router.delete('/:id', usuariosCtrl.eliminarUsuario);

module.exports = router;
