//pages/api/auth/login.js

import { generateToken } from "../../../lib/auth";


const handler = (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { username, password } = req.body;

  // Hardcode credentials (for testing purposes)
  const validUsername = "admin";
  const validPassword = "password123"; // Ideally, use hashed passwords in production
  
  if (username === validUsername && password === validPassword) {
    const token = generateToken(username); // Generate JWT token
    return res.status(200).json({ token }); // Send the token back to the client
  } else {
    return res.status(401).json({ error: "Invalid credentials" });
  }
};

export default handler;
