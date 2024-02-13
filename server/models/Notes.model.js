import mongoose from 'mongoose';
const noteSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  userId: {
    type: String,
    required: true
  }, 
  nid: {
    type: String,
    required: true, 
    unique: true
  },
  editedAt: {
    type: Date, 
    required: true
  }
});
export default mongoose.model('Note', noteSchema);