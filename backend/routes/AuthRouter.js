import express from "express";
import { loginValidation, signupValidation } from "../middleware/AuthValidation.js";
const router = express.Router();
import { signup, login } from "../controllers/AuthController.js";




router.post('/signup', signupValidation,signup);
router.post('/login', loginValidation,login);

export default router;