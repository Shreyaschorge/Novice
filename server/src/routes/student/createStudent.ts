import express, {Request, Response} from 'express';
import { promisify } from 'util';
import { body } from 'express-validator';
import { BadRequestError } from '../../errors';
import {requireAuth, validateRequest} from '../../middlewares';

import { Student } from '../../models/students';
import { getProfilePicture } from '../../services/profilePhotos';

const router = express.Router();

router.post("/createStudent",
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

    const {name, email, branch, address, score} = req.body;

    const existingStudent = await Student.findOne({email});

    if(existingStudent){
      throw new BadRequestError('Student Already Exist');
    }

    try {

      const newStudent = Student.build({
        name,
        email,
        branch,
        address,
        score,
        imageURL: getProfilePicture() 
      });
  
      await newStudent.save();
  
      res.status(201).send(newStudent);
      
    } catch (err) {
      console.log(err)
    }

  });

  export {router as createStudentRouter}