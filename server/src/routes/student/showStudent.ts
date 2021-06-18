import express, {Request, Response} from 'express';
import {requireAuth} from '../../middlewares';

import { Student } from '../../models/students';

const router = express.Router();

router.get("/student/:id",
  requireAuth,
  async (req: Request, res: Response) => {

    try {
      const student = await Student.findById({_id : req.params.id});
      res.status(200).send(student);
    } catch (err) {
      console.log(err)
    }
    
  });

  export {router as showStudentRouter}