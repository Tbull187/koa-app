const request = require('supertest');
const server = require('../../src/app');

describe('Routes tests', () => {
    describe('Root routes', () => {
        afterAll(() => {
            server.close();
        });

        test('GET /', async () => {
            const res = await request(server).get('/');
            expect(res.status).toEqual(200);
        });
    });

    describe('User routes', () => {
        afterAll(() => {
            server.close();
            console.log('bye bye');
        });

        test('GET /users', async () => {
            const res = await request(server).get('/users');
            expect(res.status).toEqual(200);
            expect(res.body).toEqual(expect.any(Array));
        });

        test('POST /users', async () => {
            const res = await request(server)
                .post('/users')
                .send({ name: 'automationTest', email: 'automationTest@test' });
            expect(res.status).toEqual(200);
        });

        test('GET /users/:id', async () => {
            const res = await request(server).get('/users/1');
            expect(res.status).toEqual(200);
            expect(res.body.id).toEqual(1);
        });

        test('PUT /users/:id', async () => {
            const response = await request(server).get('/users');
            expect(response.status).toEqual(200);
            // expect(response.body).toEqual(mockUsers);
        });

        test('DELETE /users/:id', async () => {
            const response = await request(server).get('/users');
            expect(response.status).toEqual(200);
            // expect(response.body).toEqual(mockUsers);
        });
    });
});
