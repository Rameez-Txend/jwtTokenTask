import express from 'express';
import { greetUser, loginUser, registerUser } from "../controllers/authController.js";
import { registerValidator, loginValidator } from '../helpers/validator.js';
import {authenticateUser} from '../middleware/authenticateUser.js';
const router = express.Router();
 
router.post('/register', registerValidator, registerUser);
router.post('/login', loginValidator, loginUser);
router.get('/greet', authenticateUser, greetUser);
 
export default router;