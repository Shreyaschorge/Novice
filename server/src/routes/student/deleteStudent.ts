import express, {Request, Response} from 'express';
import {requireAuth} from '../../middlewares';

import { Student } from '../../models/students';

const router = express.Router();

router.delete("/student/:id",
  requireAuth,
  async (req: Request, res: Response) => {

    try {
      await Student.findOneAndRemove({_id : req.params.id});
      res.status(200).send({"message": "Student Deleted Successfully"});
    } catch (err) {
      console.log(err)
    }
    
  });

  export {router as deleteStudentRouter}