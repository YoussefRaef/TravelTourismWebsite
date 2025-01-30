import jwt from 'jsonwebtoken';

const authenticateToken = (req, res, next) => {
    const token = req.cookies.jwt; // Extract JWT token from cookies
 
    // If no token is found, return a 403 error
    if (!token) {
       return res.status(403).send("Access denied, no token provided");
    }
 
    // Verify the token using the JWT secret key
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
       if (err) {
          return res.status(403).send("Invalid token");
       }
 
       req.user = user; // Attach user info to the request object
       next(); // Pass to the next middleware or route handler
    });
 };
 
export default authenticateToken;