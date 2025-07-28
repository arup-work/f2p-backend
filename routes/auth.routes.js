import express from 'express';
import { validationMiddleware } from '../middlewares/validation.js';
import { forgetPasswordSchema, loginSchema, registerSchema } from '../zod.js';
import AuthController from '../controllers/auth.controller.js';
const authRoute = express.Router();

// Register
authRoute.post(
    '/register',
    [validationMiddleware(registerSchema)],
    AuthController.register
)
// Login
authRoute.post(
    '/login',
    [validationMiddleware(loginSchema)],
    AuthController.login
)

// Forget password
authRoute.post(
    '/forget-password',
    [validationMiddleware(forgetPasswordSchema)],
    AuthController.forgetPassword
)

export default authRoute;