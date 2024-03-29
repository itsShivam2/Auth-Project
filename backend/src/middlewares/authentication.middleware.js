import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { User } from '../models/user.model.js';

// Load environment variables from .env file
dotenv.config();

export const authenticate = async (req, res, next) => {
    try {
        // Extract token from request headers or cookies
        const token = req.headers.authorization?.split(' ')[1] || req.cookies.accessToken;

        if (!token) {
            return res.status(401).json({ message: 'Unauthorized: Missing token' });
        }

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Attach user information to request object
        req.user = await User.findById(decoded.userId);
        
        console.log('Authenticated user:', req.user); // Debugging output

        next();
    } catch (error) {
        console.error(error);
        res.status(401).json({ message: 'Unauthorized: Invalid token' });
    }
};
