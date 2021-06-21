import request from "supertest";
import { app } from "../../../app";

it("checks if /search route handler exist", async () => {
  const res = await request(app).get("/search").query({});
  expect(res.status).not.toEqual(404);
})

it("throws a 401 if user is not authenticated", async () => {
  await request(app).get("/search").query({name: "student"}).expect(401)
})

it("servers the query successfully", async () => {
  const cookie = global.signin();

  await request(app).post('/student').set('Cookie', cookie).send({
    name: "denver",
    email: "email@email.com",
    branch: "branch",
    score: 86,
    address: "An address",
    imageURL: "imageURL",
  }).expect(201);

  await request(app).post('/student').set('Cookie', cookie).send({
    name: "Amy",
    email: "email2@email.com",
    branch: "branch",
    score: 86,
    address: "An address",
    imageURL: "imageURL",

  }).expect(201);

  await request(app).post('/student').set('Cookie', cookie).send({
    name: "Alvero",
    email: "email3@email.com",
    branch: "branch",
    score: 86,
    address: "An address",
    imageURL: "imageURL",
  }).expect(201);

  const res = await request(app).get("/search").set("Cookie", cookie).query({name: "VER"}).expect(200);

  expect(res.body.length).toEqual(2)
  expect(res.body[0].name).toEqual("denver")
  expect(res.body[1].name).toEqual("Alvero")

})