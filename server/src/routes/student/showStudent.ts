import express, {Request, Response} from 'express';
import { NotFoundError } from '../../errors';
import {requireAuth} from '../../middlewares';

import { Student } from '../../models/students';

const router = express.Router();

router.get("/student/:id",
  requireAuth,
  async (req: Request, res: Response) => {
    const student = await Student.findById({_id : req.params.id});
    if(!student) {
      throw new NotFoundError();
    }
    res.status(200).send(student);
  });

  export {router as showStudentRouter}