import express from "express";
import 'express-async-errors';
import { json } from "body-parser";
import cookieSession from "cookie-session";
import { NotFoundError } from "./errors";
import { errorHandler, currentUser } from "./middlewares";
import cors from 'cors';
 
import {testRouter} from "./routes/test";
import {createStudentRouter} from "./routes/student/createStudent";

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

app.use(testRouter);
app.use(createStudentRouter);

app.all('*', async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
