import express from 'express';
import { validationMiddleware } from '../middlewares/validation.js';
import { registerSchema } from '../zod.js';
import AuthController from '../controllers/auth.controller.js';
const authRoute = express.Router();

// Register
authRoute.post(
    '/register',
    [validationMiddleware(registerSchema)],
    AuthController.register
)

export default authRoute;