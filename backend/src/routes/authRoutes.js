import express from 'express';
import authController from '../controllers/authControllers.js';
import authenticate from '../middlewares/authMiddleware.js';

const authRoutes = express.Router();

authRoutes.post('/register', authController.register).post('/login', authController.login);
authRoutes.get('/me', authenticate, authController.me);

export default authRoutes;
