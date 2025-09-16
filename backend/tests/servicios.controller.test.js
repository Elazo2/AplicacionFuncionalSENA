const request = require('supertest');
const app = require('../app');

let idCreado;

describe('ServiciosController', () => {
  it('POST /api/servicios - debe crear un servicio', async () => {
    const res = await request(app)
      .post('/api/servicios')
      .send({ nombre: 'Limpieza', descripcion: 'Servicio de limpieza', precio: 100 });

    expect(res.status).toBe(200);
    expect(res.body.status).toBe('Servicio guardado');
  });

  it('GET /api/servicios - debe listar servicios', async () => {
    const res = await request(app).get('/api/servicios');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    idCreado = res.body[0]?._id;
  });

  it('PUT /api/servicios/:id - debe actualizar un servicio', async () => {
    const res = await request(app)
      .put(`/api/servicios/${idCreado}`)
      .send({ nombre: 'Limpieza Premium', precio: 150 });

    expect(res.status).toBe(200);
    expect(res.body.status).toBe('Servicio actualizado');
  });

  it('DELETE /api/servicios/:id - debe eliminar un servicio', async () => {
    const res = await request(app).delete(`/api/servicios/${idCreado}`);
    expect(res.status).toBe(200);
    expect(res.body.status).toBe('Servicio eliminado');
  });
});
