import request from "supertest";
import {app} from '../../../app';
import {Student} from "../../../models/students";

it("throws a 401 if user is not authenticated", async () => {
  await request(app).delete("/student").expect(401);
})

it("throws 400 if a mentor tries to delete another mentor's student", async () => {
  let students = await Student.find({});
  expect(students.length).toEqual(0);

  const cookie = global.signin();

  const student1 = await request(app).post('/student').set("Cookie", cookie).send({
    name: "student",
    email: "email@email.com",
    branch: "branch",
    score: 86,
    address: "An address",
    imageURL: "imageURL",
  });

  const student2 = await request(app).post('/student').set("Cookie", global.signin()).send({
    name: "student",
    email: "email2@email.com",
    branch: "branch",
    score: 86,
    address: "An address",
    imageURL: "imageURL",
  });

  await request(app).delete(`/student/${student2.body.id}`).set("Cookie", cookie).expect(400);

  students = await Student.find({});
  expect(students.length).toEqual(2);
})

it("delete student successfully", async () => {
  let students = await Student.find({});
  expect(students.length).toEqual(0);

  const cookie = global.signin();

  const student1 = await request(app).post('/student').set("Cookie", cookie).send({
    name: "student",
    email: "email@email.com",
    branch: "branch",
    score: 86,
    address: "An address",
    imageURL: "imageURL",
  });

  const student2 = await request(app).post('/student').set("Cookie", cookie).send({
    name: "student",
    email: "email2@email.com",
    branch: "branch",
    score: 86,
    address: "An address",
    imageURL: "imageURL",
  });

  await request(app).delete(`/student/${student2.body.id}`).set("Cookie", cookie).expect(200);

  students = await Student.find({});
  expect(students.length).toEqual(1);
})