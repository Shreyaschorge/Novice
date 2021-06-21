import request from "supertest";
import {app} from '../../../app';
import mongoose from "mongoose"

it("checks if the /student put route handler exists", async () => {
  const res = await request(app).put(`/student/${new mongoose.Types.ObjectId().toHexString()}`).send({});
  expect(res.status).not.toEqual(404);
});

it("throws a 404 if provided student doesnot exist", async () => {
  const cookie = global.signin()

  await request(app).put(`/student/${new mongoose.Types.ObjectId().toHexString()}`).set("Cookie", cookie).send({
    name: "student",
    email: "email@email.com",
    branch: "branch",
    score: 86,
    address: "An address",
    imageURL: "imageURL",
    user: "user"
  }).expect(404);
})

it("throws a 401 if user is not authenticated", async () => {
  const cookie = global.signin()

  const res = await request(app).post('/student').set("Cookie", cookie).send({
    name: "student",
    email: "email@email.com",
    branch: "branch",
    score: 86,
    address: "An address",
  });

  await request(app).put(`/student/${res.body.id}`).send({
    name: "student",
    email: "email@email.com",
    branch: "branch",
    score: 86,
    address: "An address",
    imageURL: "imageURL",
    user: "user"
  }).expect(401);

});


it("throws a 400 if a student doesn't belong to the mentor", async () => {
  const cookie = global.signin()

  const res = await request(app).post('/student').set("Cookie", cookie).send({
    name: "student",
    email: "email@email.com",
    branch: "branch",
    score: 86,
    address: "An address",
  });

  await request(app).put(`/student/${res.body.id}`).set("Cookie", global.signin()).send({
    name: "student2",
    email: "email@email.com",
    branch: "branch",
    score: 86,
    address: "An address",
    imageURL: "imageURL",
    user: "user"
  }).expect(400);
})

it("throws a 400 if student fields are invalid", async () => {
  const cookie = global.signin()

  const response = await request(app).post('/student').set("Cookie", cookie).send({
    name: "student",
    email: "email@email.com",
    branch: "branch",
    score: 86,
    address: "An address",
  });

  const res = await request(app).put(`/student/${response.body.id}`).set("Cookie", cookie).send({
    name: "",
    email: "",
    branch: "",
    score: "",
    address: "",
  });

  expect(res.body.errors[0].message).toEqual('Name is required')
  expect(res.body.errors[1].message).toEqual('Email is required')
  expect(res.body.errors[2].message).toEqual('Email must be valid')
  expect(res.body.errors[3].message).toEqual('Branch is required')
  expect(res.body.errors[4].message).toEqual('Address is required')
  expect(res.body.errors[5].message).toEqual('Score should be a number')
  expect(res.body.errors[6].message).toEqual('Score is required')
  expect(res.status).toEqual(400);

  const res2 = await request(app).put(`/student/${response.body.id}`).set('Cookie', cookie).send({
    name: "studentstudentstudentstudentstudentstudentstudentstudent",
    email: "1452@email",
    branch: "branch",
    score: 8648,
    address: "An address",
  });

  expect(res2.body.errors[0].message).toEqual("Name should have maximum of 25 characters");
  expect(res2.body.errors[1].message).toEqual("Email must be valid")
  expect(res2.body.errors[2].message).toEqual("Score should be between 0 and 100")
  expect(res2.status).toEqual(400);

})

it("successfully updates a student with valid inputs", async () => {
  const cookie = global.signin()

  const response = await request(app).post('/student').set("Cookie", cookie).send({
    name: "student",
    email: "email@email.com",
    branch: "branch",
    score: 86,
    address: "An address",
  });

  const studentResponse = await request(app).put(`/student/${response.body.id}`).set("Cookie", cookie).send({
    name: "student2",
    email: "email2@email.com",
    branch: "branch2",
    score: 15,
    address: "A second address",
    imageURL: "imageURL2",
  }).expect(200);

  expect(studentResponse.body.name).toEqual("student2");
  expect(studentResponse.body. email).toEqual("email2@email.com");
  expect(studentResponse.body.branch).toEqual("branch2");
  expect(studentResponse.body.score).toEqual(15);
  expect(studentResponse.body.address).toEqual("A second address");
  expect(studentResponse.body.imageURL).toEqual("imageURL2");
})
