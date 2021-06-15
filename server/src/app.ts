import express from "express";
import 'express-async-errors';
import { json } from "body-parser";
import cookieSession from "cookie-session";
import { NotFoundError } from "./errors";
import { errorHandler, currentUser } from "./middlewares";
import cors from 'cors';

import { showStudentRouter } from "./routes/student/showStudent";
import { showAllStudentsRouter } from "./routes/student/showAllStudents";
import { searchStudentRouter } from "./routes/student/searchStudent";
import { deleteStudentRouter } from "./routes/student/deleteStudent";
import { deleteAllStudentsRouter } from "./routes/student/deleteAllStudents";
import { editStudentRouter } from "./routes/student/editStudent";
import {createStudentRouter} from "./routes/student/createStudent";

import { signoutRouter } from "./routes/auth/signout";
import { signupRouter } from "./routes/auth/signup";
import { signinRouter } from "./routes/auth/signin";

const app = express();
app.set('trust proxy', true);
app.use(cors());
app.use(json());
app.use(
  cookieSession({
    signed: false,
    secure: false,
  })
);

app.use(currentUser);

app.use(showStudentRouter);
app.use(showAllStudentsRouter);
app.use(searchStudentRouter);
app.use(signoutRouter);
app.use(deleteStudentRouter);
app.use(deleteAllStudentsRouter);
app.use(editStudentRouter);
app.use(createStudentRouter);
app.use(signupRouter);
app.use(signinRouter);


app.all('*', async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
