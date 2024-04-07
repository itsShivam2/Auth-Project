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


// Add product to wishlist controller
export const addToWishlist = async (req, res) => {
    try {
      const { productId } = req.body;
      const { user } = req; // Assuming user is extracted by authentication middleware
  
      if (!productId) {
        return res.status(400).json({ message: "Product ID is required" });
      }
  
      // Check if product already exists in wishlist
      if (user.wishlist.includes(productId)) {
        return res.status(400).json({ message: "Product already exists in wishlist" });
      }
  
      // Add product to wishlist array
      user.wishlist.push(productId);
      await user.save();
  
      res.status(200).json({ success: true, message: "Product added to wishlist successfully" });
    } catch (error) {
      console.error("Error adding product to wishlist:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  };