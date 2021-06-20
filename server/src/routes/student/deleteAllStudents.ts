import express, {Request, Response} from 'express';
import {requireAuth} from '../../middlewares';

import { Student } from '../../models/students';

const router = express.Router();

router.delete("/student",
  requireAuth,
  async (req: Request, res: Response) => {
    await Student.deleteMany({"userId": req.currentUser!.id});
    res.status(200).send({"message": "All Student Deleted Successfully"});
  });

  export {router as deleteAllStudentsRouter}