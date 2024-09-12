import request from 'supertest';
import { app } from '../src/main';

describe('GET /', () => {
  it('should return a JSON response with a message', async () => {
    const response = await request(app).get('/');

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: 'Hello world' });
  });
});
