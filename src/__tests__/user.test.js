const request = require('supertest');
const app = require('../index'); // Assuming your express app is in this file

describe('User Routes', () => {
  let userId;

  // Test for creating a user
  it('should create a user', async () => {
    const newUser = {
      name: 'John Doe',
      mobileNumber: '1234567890',
      address: '123 Street, City, Country'
    };

    const res = await request(app)
      .post('/api/users')
      .send(newUser);

    expect(res.status).toBe(201);
    expect(res.body.message).toBe('User created successfully');
    expect(res.body.userId).toBeDefined();
    userId = res.body.userId; // Store the userId for later use
  });

  // Test for getting all users
  it('should get all users', async () => {
    const res = await request(app)
      .get('/api/users');

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});
