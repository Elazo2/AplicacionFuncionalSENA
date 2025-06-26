const express = require('express');
const router = express.Router();
const servicioCtrl = require('../controllers/servicios.controller');

router.get('/', servicioCtrl.getServicios);
router.post('/', servicioCtrl.createServicio);
router.get('/:id', servicioCtrl.getServicio);
router.put('/:id', servicioCtrl.updateServicio);
router.delete('/:id', servicioCtrl.deleteServicio);

module.exports = router;
