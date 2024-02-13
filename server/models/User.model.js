import mongoose from 'mongoose';
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true, 
    unique: true
  },
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  joinedAt: {
    type: Date, 
    required: true
  }
});
export default mongoose.model('User', userSchema);