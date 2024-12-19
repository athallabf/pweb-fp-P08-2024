import mongoose from 'mongoose';

const connectDB = async () => {
  const mongoUrl = process.env.MONGO_URI || '';
  if (!mongoUrl) throw new Error('MONGO_URL is not defined');

  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(mongoUrl); 
    console.log('MongoDB connected!');
  }
};

export default connectDB;
