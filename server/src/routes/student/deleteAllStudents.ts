import express, {Request, Response} from 'express';
import {requireAuth} from '../../middlewares';

import { Student } from '../../models/students';

const router = express.Router();

router.delete("/student",
  requireAuth,
  async (req: Request, res: Response) => {

    try {
      await Student.deleteMany({});
      res.status(200).send({"message": "All Student Deleted Successfully"});
    } catch (err) {
      console.log(err)
    }
    
  });

  export {router as deleteAllStudentsRouter}