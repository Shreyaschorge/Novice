import express, {Request, Response} from 'express';

import {requireAuth} from '../../middlewares';
import { Student } from '../../models/students';

const router = express.Router();

router.get("/student",
  requireAuth,
  async (req: Request, res: Response) => { 
    const students = await Student.find({userId: req.currentUser!.id});
    res.status(200).send(students);
  });

  export {router as showAllStudentsRouter}