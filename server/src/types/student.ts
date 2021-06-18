import mongoose from 'mongoose';
import { UserDoc } from '../models/user';

export type StudentReqBodyModel = {
  name: string; 
  email: string;
  branch: string;
  address: string;
  score: number;
  imageURL?: string;
  id?: string;
  user: string,
}