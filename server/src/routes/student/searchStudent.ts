import express, {Request, Response} from 'express';
import { requireAuth } from '../../middlewares';

import { Student } from '../../models/students';

const router = express.Router();

router.get("/search",
  requireAuth,
  async (req: Request, res: Response) => {
    const students = await Student.find({$and: [{userId: req.currentUser!.id}, {name:{$regex : `${req.query.name}`, $options : "i"}}]});
    res.status(200).send(students); 
  });

  export {router as searchStudentRouter}