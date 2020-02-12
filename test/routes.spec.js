const request = require('supertest');
const server = require('../src/app.js');

require('../src/globals');

describe('API tests', () => {
    describe('User routes', () => {
        beforeAll(async () => {
            console.log('Jest starting!');
        });
    
        afterAll(() => {
            server.close();
            console.log('server closed!');
        });
        
        test('GET /users', async () => {
            const res = await request(server).get('/users');
            expect(res.status).toEqual(200);
            expect(res.body).toEqual(expect.any(Array));
        });
    
        test('POST /users', async () => {
            const res = await request(server)
                .post('/users')
                .send({ name: 'Test User', email: '' });
            expect(res.status).toEqual(200);
        });
    
        test('GET /users/:id', async () => {
            const response = await request(server).get('/users/1'));
            expect(response.status).toEqual(200);
            expect(response.body.name).toEqual('Test User');
        });

        test('PUT /users/:id', async () => {
            const response = await request(server).get('/users');
            expect(response.status).toEqual(200);
            expect(response.body).toEqual(mockUsers);
        });

        test('DELETE /users/:id', async () => {
            const response = await request(server).get('/users');
            expect(response.status).toEqual(200);
            expect(response.body).toEqual(mockUsers);
        });
    });


});
