const request = require('supertest');
const app = require('../app');

let idCreado;

describe('ProductosController', () => {
  it('POST /api/productos - debe crear un producto', async () => {
    const res = await request(app)
      .post('/api/productos')
      .send({ nombre: 'Mouse', descripcion: 'Óptico', precio: 50 });

    expect(res.status).toBe(200);
    expect(res.body.status).toBe('Producto guardado');
  });

  it('GET /api/productos - debe listar productos', async () => {
    const res = await request(app).get('/api/productos');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    idCreado = res.body[0]?._id;
  });

  it('PUT /api/productos/:id - debe actualizar un producto', async () => {
    const res = await request(app)
      .put(`/api/productos/${idCreado}`)
      .send({ nombre: 'Mouse Pro', precio: 80 });

    expect(res.status).toBe(200);
    expect(res.body.status).toBe('Producto actualizado');
  });

  it('DELETE /api/productos/:id - debe eliminar un producto', async () => {
    const res = await request(app).delete(`/api/productos/${idCreado}`);
    expect(res.status).toBe(200);
    expect(res.body.status).toBe('Producto eliminado');
  });
});
