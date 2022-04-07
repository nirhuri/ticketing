import request from 'supertest';
import { app } from '../../app';

it('fails when a email that does not exist is supplied', async () => {
  await request(app)
    .post('/api/users/signin')
    .send({
      email: 'test1234@test.com',
      password: 'passw222ord'
    })
    .expect(400);
});

xit('fails when an incorrect password is supplied', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@test.com',
      password: 'passw222ord'
    })
    .expect(201);

  await request(app)
    .post('/api/users/signin')
    .send({
      email: 'test@test.com',
      password: 'aslkdfjalskdfj'
    })
    .expect(400);
});

xit('responds with a cookie when given valid credentials', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'hurinir@gmail.com',
      password: '12345'
    })
    .expect(201);

  const response = await request(app)
    .post('/api/users/signin')
    .send({
      email: 'hurinir@gmail.com',
      password: '12345'
    })
    .expect(200);

  expect(response.get('Set-Cookie')).toBeDefined();
});
