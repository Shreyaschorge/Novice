require('dotenv').config();
import mongoose from 'mongoose';
import { app } from './app';

const start = async () => {
  console.log("Starting up...")

  try {
    if (!process.env.MONGO_URI) {
      throw new Error('MONGO_URI must be defined');
    }

    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    console.log('Connected to MongoDb...');
  } catch (err) {
    
  }

  app.listen(5000, () => {
    console.log('Listening on port 5000');
  });
};

start();