const request = require('supertest');
const server = require('../src/app.js');
require('../src/globals');

describe('route tests', () => {
    beforeAll(async () => {
        console.log('Jest starting!');
    });

    afterAll(() => {
        server.close();
        console.log('server closed!');
    });
    
    test('GET / should return Hello World', async () => {
        const response = await request(server).get('/');
        expect(response.status).toEqual(200);
        expect(response.text).toContain('Hello World!');
    });

    test('GET /users should return all users', async () => {
        const response = await request(server).get('/users');
        expect(response.status).toEqual(200);
        expect(response.body).toEqual(mockUsers);
    });

    test('POST /users should create and return a new user', async () => {
        const response = await request(server).post('/users').send({ name: 'Test User' });
        expect(response.status).toEqual(200);
        expect(response.body.name).toEqual('Test User');
    });
});