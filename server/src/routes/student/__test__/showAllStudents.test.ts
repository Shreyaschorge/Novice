import request from "supertest";
import { app } from "../../../app";

it("checks if /student get route handler exists", async () => {
  const res = await request(app).get("/student");
  expect(res.status).not.toEqual(404);
})

it("throws a 401 if user is not authenticated", async () => {
  await request(app).get("/student").expect(401);
})

it("fetch all students of a mentor successfully", async () => {
  const cookie = global.signin();

  await request(app).post('/student').set('Cookie', cookie).send({
    name: "student",
    email: "email@email.com",
    branch: "branch",
    score: 86,
    address: "An address",
    imageURL: "imageURL",
  })
  await request(app).post('/student').set('Cookie', cookie).send({
    name: "student",
    email: "email2@email.com",
    branch: "branch",
    score: 86,
    address: "An address",
    imageURL: "imageURL",
  })
  await request(app).post('/student').set('Cookie', global.signin()).send({
    name: "student",
    email: "email3@email.com",
    branch: "branch",
    score: 86,
    address: "An address",
    imageURL: "imageURL",
  })

  const res = await request(app).get('/student').set('Cookie', cookie).expect(200);

  expect(res.body.length).toEqual(2)
  expect(res.body[0].email).toEqual("email@email.com")
  expect(res.body[1].email).toEqual("email2@email.com")
})