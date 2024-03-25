import express from 'express';
import { signup, login, refreshAccessToken, logout, updatePassword, getCurrentUser } from '../controllers/auth.controller.js';
import { authenticate } from '../middlewares/authentication.middleware.js';

const router = express.Router();

// Authentication routes
router.post('/signup', signup);
router.post('/login', login);
router.post('/refresh-token', refreshAccessToken);

router.post('/logout', authenticate, logout);
router.post('/update-password', authenticate, updatePassword);
router.get('/current-user', authenticate, getCurrentUser);

export default router;
