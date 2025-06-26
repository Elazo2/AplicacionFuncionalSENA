const Servicio = require('../models/servicio');
const servicioCtrl = {};

servicioCtrl.getServicios = async (req, res) => {
  const servicios = await Servicio.find();
  res.json(servicios);
};

servicioCtrl.createServicio = async (req, res) => {
  const servicio = new Servicio(req.body);
  await servicio.save();
  res.json({ status: 'Servicio guardado' });
};

servicioCtrl.getServicio = async (req, res) => {
  const servicio = await Servicio.findById(req.params.id);
  res.json(servicio);
};

servicioCtrl.updateServicio = async (req, res) => {
  await Servicio.findByIdAndUpdate(req.params.id, req.body);
  res.json({ status: 'Servicio actualizado' });
};

servicioCtrl.deleteServicio = async (req, res) => {
  await Servicio.findByIdAndDelete(req.params.id);
  res.json({ status: 'Servicio eliminado' });
};

module.exports = servicioCtrl;
