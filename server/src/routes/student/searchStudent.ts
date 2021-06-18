import express, {Request, Response} from 'express';

import { Student } from '../../models/students';

const router = express.Router();

router.get("/search",
  async (req: Request, res: Response) => {
    try {
      const students = await Student.find({name:{$regex : `${req.query.name}`, $options : "i"}});
      res.status(200).send(students);
    } catch (err) {
      console.log(err)
    }
    
  });

  export {router as searchStudentRouter}