import express, {Request, Response} from 'express';
import { body } from 'express-validator';
import { NotFoundError } from '../../errors';
import {requireAuth, validateRequest} from '../../middlewares';

import { Student } from '../../models/students';
import { getProfilePicture } from '../../services/profilePhotos';

const router = express.Router();

router.put("/student/:id",
  [
    body('name').not().isEmpty().withMessage('Name is required'),
    body('email').not().isEmpty().withMessage('Email is required').isEmail().withMessage("Email must be valid"),
    body('branch').not().isEmpty().withMessage('Branch is required'),
    body('address').not().isEmpty().withMessage('Address is required'),
    body('score').isFloat({gt : 0}).withMessage('Score should be a number').not().isEmpty().withMessage('Score is required').custom((value) => {
      if (value < 0 || value > 100){
        throw new Error('Score should be between 0 and 100');
      }
      return true;
    })
  ],
  validateRequest,
  async (req: Request, res: Response) => {

    const student = await Student.findById(req.params.id);

    if(!student){
      throw new NotFoundError();
    }

    const {name, email, branch, address, score} = req.body;

    try {
      student.set({
        name,
        email,
        branch,
        address,
        score,
        imageURL: getProfilePicture() 
      });
      await student.save();
      res.status(200).send(student);
    } catch (err) {
      console.log(err)
    }

  });

  export {router as editStudentRouter}