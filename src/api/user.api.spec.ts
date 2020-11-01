const request = require('supertest');
const app = require('../app');

// describe('Post Endpoints', () => {
//     it('should create a new user', async () => {
//         const res = await request(app)
//             .post('/users')
//             .send({
//                 "login": "testUser",
//                 "password": "test",
//                 "age": 30,
//                 "isDeleted": false,
//             });
//         expect(res.statusCode).toEqual(200);
//         expect(res.body).toHaveProperty('post')
//     })
// });
