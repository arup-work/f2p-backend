import express from 'express';
import { validationMiddleware } from '../middlewares/validation';
import { registerSchema } from '../zod';
const authRoute = express.Router();

authRoute.post(
    '/register',
    [validationMiddleware(registerSchema)]

)