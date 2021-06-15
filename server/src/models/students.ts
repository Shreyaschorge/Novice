import mongoose from 'mongoose';

interface StudentAttrs {
  name: string;
  score: number;
  imageURL: string;
  email: string;
  branch: string;
  address: string;
}

interface StudentDoc extends mongoose.Document {
  name: string;
  score: number;
  imageURL: string;
  branch: string;
  email: string;
  address: string;
}

interface StudentModel extends mongoose.Model<StudentDoc> {
  build(attrs: StudentAttrs): StudentDoc;
}

const studentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    score: {
      type: Number,
      required: true,
    },
    branch:{
      type: String,
      required: true,
    },
    imageURL: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    }
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      },
    },
  }
);

studentSchema.statics.build = (attrs: StudentAttrs) => {
  return new Student(attrs);
};

const Student = mongoose.model<StudentDoc, StudentModel>('Student', studentSchema);

export { Student };
