import request from "supertest";
import mongoose from "mongoose";
import { app } from "../../../app";

it("checks if /student/:id get route handler exists", async () => {
  const res = await request(app).get(`/student/${new mongoose.Types.ObjectId().toHexString()}`);
  expect(res.status).not.toEqual(404);
})

it("throws a 401 if user is not authenticated", async () => {
  await request(app).get(`/student/${new mongoose.Types.ObjectId().toHexString()}`).expect(401);
})

it("throws a 404 passed student is not found", async () => {
  const res = await request(app).get(`/student/${new mongoose.Types.ObjectId().toHexString()}`).set('Cookie', global.signin()).expect(404);
})

it("fetch student successfully", async () => {
  const cookie = global.signin();

  const res = await request(app).post('/student').set('Cookie', cookie).send({
    name: "student",
    email: "email@email.com",
    branch: "branch",
    score: 86,
    address: "An address",
  });

  const studentResponse = await request(app).get(`/student/${res.body.id}`).set('Cookie', cookie);

  expect(studentResponse.status).toEqual(200);
  expect(studentResponse.body.email).toEqual("email@email.com")
})