import mongoose from 'mongoose';

const connectDB = (url) => {
  mongoose.set("strictQuery", false);
  return mongoose.connect(url, {
      dbName: process.env.DATABASE_NAME
  })
}

export default connectDB;