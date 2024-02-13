import asyncWrapper from '../middlewares/async-wrapper.js';
import Notes from '../models/Notes.model.js';
import verifyToken from '../utils/verify-token.js';

const createNote = asyncWrapper(async (req, res) => {
  const { token, title } = req.body;
  let rand = Math.random().toString(36).substring(2, 10);
  try {
    
    verifyToken(token, async (data, err) => {
      if(err) {
        res.status(403).json({ message: "Forbidden" })
        return;
      }
      const note = new Notes({ title, content: "Hey, edit me!", userId: data.userId, nid: rand, editedAt: Date.now() });
      await note.save();
      res.json({ message: "Note created.", nid: rand })
    })
  } catch (error) {
    res.status(500).json({ message: "Internal server error" })
  }
})

const updateNote = asyncWrapper(async (req, res) => {
  const { token, nid, newContent } = req.body;
  console.log(req.body)
  try {
    verifyToken(token, async (data, err) => {
      if(err) {
        res.status(403).json({ message: "Forbidden" });
        return;
      }
      const doc = await Notes.findOneAndUpdate(
        { nid: nid, userId: data.userId }, 
        { content: newContent, editedAt: Date.now() }, 
        { new: true }
      ).exec();
      
      if (!doc) {
        return res.status(404).json({ message: "Note not found" });
      }
      res.json({ message: "Note saved!"})
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

const readNote = asyncWrapper(async (req, res) => {
  const { token, nid } = req.body;
  try {
    verifyToken(token, async (data, err) => {
      if(err) {
        res.status(403).json({ message: "Forbidden" });
        return;
      }
      
      const note = await Notes.findOne({ nid: nid, userId: data.userId }).exec();
      if (!note) {
        return res.status(404).json({ message: "Note not found" });
      }
    
      return res.json({ note });
      
    });
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "Internal server error" });
  }
});

const readAllNotes = asyncWrapper(async (req, res) => {
  const { token } = req.body;
  try {
    verifyToken(token, async (data, err) => {
      if(err) {
        res.status(403).json({ message: "Forbidden" });
        return;
      }
      const notes = await Notes.find({ userId: data.userId });
      
      res.json({ notes });
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

const deleteNote = asyncWrapper(async (req, res) => {
  const { token, nid } = req.body;
  try {
    verifyToken(token, async (data, err) => {
      if(err) {
        res.status(403).json({ message: "Forbidden" });
        return;
      }
      const deletedNote = await Notes.findOneAndDelete({ nid: nid, userId: data.username });
      if (!deletedNote) {
        res.status(404).json({ message: "Note not found" });
        return;
      }
      res.json({ message: "Note deleted successfully" });
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

/*
createNote - token, title
updateNote - token, nid, newContent
readNote - token, nid
readAllNotes - token
deleteNote - token, nid
*/


export { createNote, updateNote, readNote, readAllNotes, deleteNote };