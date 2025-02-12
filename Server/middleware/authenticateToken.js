import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
dotenv.config(); // Ensure .env is loaded


const authenticateToken = (req, res, next) => {
  // Extract the token from the cookies (ensure your client sends cookies)
  const token = req.cookies.jwt;  
  console.log("Token from cookie:", token);

  if (!token) {
    return res.status(403).json({ message: "Access denied, please login" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(" role:", decoded.user.role);
    if (!decoded.user || !decoded.user.id) {
      return res.status(403).json({ message: "Invalid token: User ID missing" });
    }
    // Attach only the user payload for convenience
    req.user = decoded.user;
    next();
  } catch (err) {
    console.error("Token verification error:", err);
    return res.status(403).json({ message: "Invalid token" });
  }
};

export default authenticateToken;
