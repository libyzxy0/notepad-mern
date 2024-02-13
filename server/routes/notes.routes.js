import express from 'express';
import {
  createNote, 
  updateNote, 
  readNote, 
  readAllNotes, 
  deleteNote
} from '../controllers/notes.controller.js';

const router = express.Router();


router.route('/create-note').post(createNote);
router.route('/update-note').post(updateNote);
router.route('/read-note').post(readNote);
router.route('/read-all-notes').post(readAllNotes);
router.route('/delete-note').post(deleteNote);

export default router;