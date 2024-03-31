export const adminAuth = (req, res, next) => {
    // Assuming user object is attached to request after authentication middleware
    const { user } = req;
  
    // Check if user exists and if user is admin
    if (user && user.role === "admin") {
      // User is admin, proceed to the next middleware/controller function
      next();
    } else {
      // User is not admin, return Forbidden response
      return res.status(403).json({ message: "Admin access required" });
    }
  };
  