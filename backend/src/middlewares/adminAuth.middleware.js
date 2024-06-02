export const adminAuth = (req, res, next) => {
    const { user } = req;
  
  if (user && user.role === "admin") {
      console.log("admin access granted");
      next();
    } else {
      return res.status(403).json({ message: "Admin access required" });
    }
  };
  