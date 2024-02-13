import express from 'express';
import {
  login,
  register, 
  checkSession
} from '../controllers/user.controller.js';
import verifyToken from '../middlewares/verify-token.js';

const router = express.Router();

router.route('/login').post(login);
router.route('/register').post(register);
router.route('/user-session').post(verifyToken, checkSession)

export default router;