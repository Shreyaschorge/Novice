import express, {Request, Response} from 'express';
import { body } from 'express-validator';
import { BadRequestError, NotAuthorizedError } from '../../errors';
import {requireAuth, validateRequest} from '../../middlewares';

import { Student } from '../../models/students';
import { getProfilePicture } from '../../services/profilePhotos';

import {StudentReqBodyModel} from "../../types/student";

const router = express.Router();

router.post("/student",
  requireAuth,
  [
    body('name').not().isEmpty().withMessage('Name is required').isLength({max: 25}).withMessage("Name should have maximum of 25 characters"),
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
  async (req: Request<{}, {}, StudentReqBodyModel>, res: Response) => {

    const {name, email, branch, address, score } = req.body;

    const existingStudent = await Student.findOne({email});

    if(existingStudent) {
      if(existingStudent.userId === req.currentUser!.id){
        throw new BadRequestError('Student Already Exist');
      }  else throw new BadRequestError('Student has been assigned to another mentor')
    }
     
    const newStudent = Student.build({
      name,
      email,
      branch,
      address,
      score: parseFloat(score.toFixed(2)),
      imageURL: getProfilePicture(),
      userId: req.currentUser!.id, 
    });

    await newStudent.save();

    res.status(201).send(newStudent);

  });

  export {router as createStudentRouter}