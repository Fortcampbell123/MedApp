import express from 'express';
import bcrypt from 'bcrypt';
import User from '../models/userModel.js';
import expressSession from 'express-session';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

// Initialize express-session
router.use(expressSession({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
}));

// Middleware to parse JSON request bodies
router.use(express.json());

// Registration route
router.post('/register', async (req, res) => {
  try {
    const { username, password, roles } = req.body;
    const user = new User({ username, password, roles });
    await user.save();
    console.log(`User ${username} registered successfully`);
    res.status(201).send('User registered successfully');
  } catch (error) {
    console.error(`Error registering user: ${error.message}\n${error.stack}`);
    res.status(500).send(error.message);
  }
});

// Login route
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      console.log(`Login failed: User ${username} not found.`);
      return res.status(401).send('Authentication failed: User not found.');
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      req.session.user = user;
      console.log(`User ${username} logged in successfully`);
      res.status(200).send('Logged in successfully');
    } else {
      console.log(`Authentication failed: Incorrect password for user ${username}.`);
      res.status(401).send('Authentication failed: Incorrect password.');
    }
  } catch (error) {
    console.error(`Error during login: ${error.message}\n${error.stack}`);
    res.status(500).send(error.message);
  }
});

export default router;