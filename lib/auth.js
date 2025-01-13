//lib/auth.js
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || "your_secret_key"; // Use a strong secret key

// Generate JWT token
export const generateToken = (username) => {
  const payload = { username };
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });
};

// Verify JWT token
export const verifyToken = (token) => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    throw new Error('Invalid or expired token');
  }
};
