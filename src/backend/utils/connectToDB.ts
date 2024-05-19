import mongoose from 'mongoose';
import clientPromise from '@/backend/lib/db';

export const connectToDB = async () => {
  try {
    await clientPromise;
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(process.env.MONGODB_URI!);
      console.log('Connected to MongoDB');
    }
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
};
