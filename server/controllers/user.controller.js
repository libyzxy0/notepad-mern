import asyncWrapper from '../middlewares/async-wrapper.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.model.js';

const MESSAGES = {
  INCORRECT_USERNAME: "User with that username not found.", 
  INCORRECT_PASSWORD: "Incorrect password.",
  CAPTCHA_NOT_VERIFIED: "Please verify captcha.", 
  USER_REGISTER_ERROR: "Error while registering the user.", 
  USER_REGISTER_SUCCESS: "User registered successfully."
}

const JWT_SECRET = process.env.JWT_SECRET;



const login = asyncWrapper(async (req, res) => {
  const { captcha, username, password } = req.body;
  if(!captcha) {
    //Check captcha
  }
  
  const user = await User.findOne({ username }) || await User.findOne({ email: username });
  if(!user) return res.status(404).send({ message: MESSAGES.INCORRECT_USERNAME });
  if(!bcrypt.compareSync(password, user.password)) return res.status(401).send({ message: MESSAGES.INCORRECT_PASSWORD });
  
  const accessToken = jwt.sign({ userId: user._id, username: user.username }, JWT_SECRET, { expiresIn: '7d' });

  res.json({ accessToken });
}) 

const register = asyncWrapper(async (req, res) => {
  const { captcha, email, username, password } = req.body;
  console.log(req.body)
  try {
  const hashedPassword = bcrypt.hashSync(password, 8);
  const user = new User({ email, username, password: hashedPassword, joinedAt: new Date() });
  await user.save();
  res.status(201).json({ message: MESSAGES.USER_REGISTER_SUCCESS });
  } catch (error) {
    res.status(400).send({ message: MESSAGES.USER_REGISTER_ERROR })
  }
}) 

const checkSession = asyncWrapper(async (req, res) => {
  try {
      const user = await User.findById(req.userId);
      console.log(user)
      if (!user) {
        return res.status(401).json({ message: 'Unauthorized access.' });
      }
      res.json(user);
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
})
export { login, register, checkSession };