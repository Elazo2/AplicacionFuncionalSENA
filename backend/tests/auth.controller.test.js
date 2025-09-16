const request = require('supertest');
const app = require('../app');

describe('AuthController', () => {
  it('POST /api/auth/register - debe registrar un usuario', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({ username: 'testuser', password: '123456' });

    expect(res.status).toBe(201); 
    expect(res.body.status || res.body.message).toBeDefined();
  });

  it('POST /api/auth/login - debe rechazar credenciales inválidas', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({ username: 'usuariox', password: 'mal' });

    expect([401, 404]).toContain(res.status);
    expect(res.body.message).toBeDefined();
  });
});