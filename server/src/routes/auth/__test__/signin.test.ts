import request from 'supertest';
import { app } from '../../../app';

it("checks if /signin route handler exist", async () => {
  const res = await request(app).post('/signin').send({});
  expect(res.status).not.toEqual(404);
});

it("checks if request is valid", async () => {
  await request(app).post('/signin').send({email: 'test@test.com'}).expect(400);
  await request(app).post('/signin').send({password: 'asdgfr'}).expect(400);
})

it("fails if email does not exist is supplied", async () => {
  return request(app).post('/signin').send({email: 'test@test.com',password: 'sdfwdf'}).expect(400);
});

it("fails if password is wrong", async () => {
  await request(app).post('/signup').send({email: 'test@test.com',password: 'sdfwdf'}).expect(201);
  await request(app).post('/signin').send({email: 'test@test.com',password: 'ertgerthewtg'}).expect(400);
});

it("success if password is correct", async () => {
  await request(app).post('/signup').send({email: 'test@test.com',password: 'password'}).expect(201);
  await request(app).post('/signin').send({email: 'test@test.com',password: 'password'}).expect(200);
});

it('responds with a cookie when given valid credentials', async () => {
  await request(app)
    .post('/signup')
    .send({
      email: 'test@test.com',
      password: 'password'
    })
    .expect(201);

  const response = await request(app)
    .post('/signin')
    .send({
      email: 'test@test.com',
      password: 'password'
    })
    .expect(200);

  expect(response.get('Set-Cookie')).toBeDefined();
});