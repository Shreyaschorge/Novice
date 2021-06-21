import request from "supertest";
import { app } from "../../../app";
import { Student } from "../../../models/students";

it("checks if the /student post route handler exists", async () => {
  const res = await request(app).post('/student').send({});
  expect(res.status).not.toEqual(404);
});

it("throws a 401 if user is not authenticated", async () => {
  const student = {
    name: "student",
    email: "email@email.com",
    branch: "branch",
    score: 86,
    address: "An address",
  }
  const res = await request(app).post('/student').send(student);
  expect(res.status).toEqual(401);
});

it("throws a 400 if student fields are invalid", async () => {
  const student = {
    name: "",
    email: "",
    branch: "",
    score: "",
    address: "",
  }

  const res = await request(app).post('/student').set("Cookie", global.signin()).send(student);

  expect(res.body.errors[0].message).toEqual('Name is required')
  expect(res.body.errors[1].message).toEqual('Email is required')
  expect(res.body.errors[2].message).toEqual('Email must be valid')
  expect(res.body.errors[3].message).toEqual('Branch is required')
  expect(res.body.errors[4].message).toEqual('Address is required')
  expect(res.body.errors[5].message).toEqual('Score should be a number')
  expect(res.body.errors[6].message).toEqual('Score is required')
  expect(res.status).toEqual(400);

  const student2 = {
    name: "studentstudentstudentstudentstudentstudentstudentstudent",
    email: "1452@email",
    branch: "branch",
    score: 8648,
    address: "An address",
  }

  const res2 = await request(app).post('/student').set('Cookie', global.signin()).send(student2);

  expect(res2.body.errors[0].message).toEqual("Name should have maximum of 25 characters");
  expect(res2.body.errors[1].message).toEqual("Email must be valid")
  expect(res2.body.errors[2].message).toEqual("Score should be between 0 and 100")
  expect(res2.status).toEqual(400);

})

it("throws a 400 if student already exists", async () => {
  const student = {
    name: "student",
    email: "email@email.com",
    branch: "branch",
    score: 86,
    address: "An address",
  }
  const cookie = global.signin();

  await request(app).post('/student').set('Cookie', cookie).send(student);

  const res2 = await request(app).post('/student').set('Cookie', cookie).send(student);
  expect(res2.body.errors[0].message).toEqual("Student Already Exist");
  expect(res2.status).toEqual(400)

})

it("throws a 400 if student is already been asigned to another mentor", async () => {
  const student = {
    name: "student",
    email: "email@email.com",
    branch: "branch",
    score: 86,
    address: "An address",
  }

  await request(app).post('/student').set('Cookie', global.signin()).send(student);

  const res2 = await request(app).post('/student').set('Cookie', global.signin()).send(student);
  expect(res2.body.errors[0].message).toEqual("Student has been assigned to another mentor");
  expect(res2.status).toEqual(400)
})

it("create student with valid input", async () => {

  let student = await Student.find({})

  expect(student.length).toEqual(0);

  const res = await request(app).post('/student').set('Cookie', global.signin()).send({
    name: "student",
    email: "email@email.com",
    branch: "branch",
    score: 86,
    address: "An address",
    imageURL: "imageURL",

  }).expect(201);

  student = await Student.find({});
  expect(student.length).toEqual(1);
  expect(student[0].name).toEqual("student");
  expect(student[0].email).toEqual("email@email.com");
  expect(student[0].branch).toEqual("branch");
  expect(student[0].score).toEqual(86);
  expect(student[0].address).toEqual("An address");
})