import express from 'express';
import { getUserProfile, getAdminPanel } from '../controllers/user.controller.js';
import { authenticate } from '../middlewares/authentication.middleware.js';
import { authorize } from '../middlewares/authorization.middleware.js';

const router = express.Router();

// Protected routes
router.get('/profile', authenticate, getUserProfile); // Apply authentication middleware
router.get('/admin', authenticate, authorize(['admin']), getAdminPanel); // Apply authentication and authorization middlewares

export default router;
