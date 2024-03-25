export const getUserProfile = (req, res) => {
    try {
        // Retrieve user details from req.user (assuming it's set during authentication)
        const user = req.user;
        
        // Return user profile
        res.status(200).json({ user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Function to access admin panel
export const getAdminPanel = (req, res) => {
    try {
        // Check if user is an admin (you can implement your own logic)
        const isAdmin = req.user.role === 'admin';
        
        // If user is not an admin, return 403 Forbidden
        if (!isAdmin) {
            return res.status(403).json({ message: 'Access denied. User is not an admin.' });
        }
        
        // Return admin panel
        res.status(200).json({ message: 'Admin panel accessed successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};