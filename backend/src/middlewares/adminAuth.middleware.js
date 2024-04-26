export const adminAuth = (req, res, next) => {
    // user object is attached to request after authentication middleware
    const { user } = req;
  
    // if user exists and if user is admin
    if (user && user.role === "admin") {
      // User is admin, next middleware
      next();
    } else {
      // User is not admin, return Forbidden response
      return res.status(403).json({ message: "Admin access required" });
    }
  };
  