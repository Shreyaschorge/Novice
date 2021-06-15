import express, {Request, Response} from 'express';

import { Student } from '../../models/students';

const router = express.Router();

router.get("/search",
  async (req: Request, res: Response) => {

    console.log(req.query.name);
    try {
      const students = await Student.find({name:{$regex : `${req.query.name}`, $options : "i"}});
      res.status(200).send(students);
    } catch (err) {
      console.log("errror")
      console.log(err)
    }
    
  });

  export {router as searchStudentRouter}