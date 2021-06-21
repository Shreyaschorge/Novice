import express, {Request, Response} from 'express';
import { BadRequestError } from '../../errors';
import {requireAuth} from '../../middlewares';

import { Student } from '../../models/students';

const router = express.Router();

router.delete("/student/:id",
  requireAuth,
  async (req: Request, res: Response) => {

    const student = await Student.findById(req.params.id);
    
    if(student){
      if(student.userId !== req.currentUser!.id) throw new BadRequestError("Cannot delete the student of another mentor");
    }

    await Student.findOneAndRemove({$and : [{"userId": req.currentUser!.id}, {_id : req.params.id}]});
    res.status(200).send({"message": "Student Deleted Successfully"});
  
    
  });

  export {router as deleteStudentRouter}