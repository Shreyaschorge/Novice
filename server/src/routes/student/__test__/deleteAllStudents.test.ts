import request from "supertest";
import {app} from '../../../app';
import {Student} from "../../../models/students";

it("checks if /student delete route handler exists", async () => {
  const res = await request(app).delete('/student').send({});
  expect(res.status).not.toEqual(404);
});

it("throws a 401 if user is not authenticated", async () => {
  await request(app).delete("/student").expect(401);
})

it("delete all students of a specific mentor", async ()=>{
  let students = await Student.find({});
  expect(students.length).toEqual(0);

  const cookie = global.signin();

  await request(app).post('/student').set("Cookie", cookie).send({
    name: "student",
    email: "email@email.com",
    branch: "branch",
    score: 86,
    address: "An address",
    imageURL: "imageURL",
  });

  await request(app).post('/student').set("Cookie", cookie).send({
    name: "student",
    email: "email2@email.com",
    branch: "branch",
    score: 86,
    address: "An address",
    imageURL: "imageURL",
  });

  await request(app).post('/student').set("Cookie", global.signin()).send({
    name: "student",
    email: "email3@email.com",
    branch: "branch",
    score: 86,
    address: "An address",
    imageURL: "imageURL",
  });

  await request(app).delete("/student").set("Cookie", cookie).expect(200);

  students = await Student.find({});
  expect(students.length).toEqual(1);

})