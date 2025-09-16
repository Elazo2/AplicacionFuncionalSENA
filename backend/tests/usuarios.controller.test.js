const request = require('supertest');
const app = require('../app');

let idCreado;

describe('UsuariosController', () => {
  it('POST /api/usuarios - debe crear un usuario', async () => {
    const res = await request(app)
      .post('/api/usuarios')
      .send({ nombre: 'Ana', cargo: 'Dev', oficina: 'Bogotá', salario: 3000 });

    expect(res.status).toBe(201);
    expect(res.body.mensaje).toBe('Usuario creado correctamente');
  });

  it('GET /api/usuarios - debe listar usuarios', async () => {
    const res = await request(app).get('/api/usuarios');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    idCreado = res.body[0]?._id;
  });

  it('PUT /api/usuarios/:id - debe actualizar un usuario', async () => {
    const res = await request(app)
      .put(`/api/usuarios/${idCreado}`)
      .send({ nombre: 'Ana Actualizada' });

    expect(res.status).toBe(200);
    expect(res.body.mensaje).toBe('Usuario actualizado');
  });

  it('DELETE /api/usuarios/:id - debe eliminar un usuario', async () => {
    const res = await request(app).delete(`/api/usuarios/${idCreado}`);
    expect(res.status).toBe(200);
    expect(res.body.mensaje).toBe('Usuario eliminado');
  });
});
