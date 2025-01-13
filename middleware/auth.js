//middleware/auth.js

import { verifyToken } from "../lib/auth";

const authenticate = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1]; // Get token from Authorization header

  if (!token) {
    return res.status(401).json({ error: 'Authorization token required' });
  }

  try {
    const decoded = verifyToken(token);
    req.user = decoded; // Store user data in request object
    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    return res.status(401).json({ error: 'Invalid or expired token' }); // Prevent further code execution after error
  }
};

export default authenticate;
