export type StudentReqBodyModel = {
  name: string; 
  email: string;
  branch: string;
  address: string;
  score: number;
  imageURL?: string;
  id?: string;
}