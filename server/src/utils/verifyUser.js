// middleware/auth.js
import jwt from 'jsonwebtoken';

export const verifyUser = (req, res, next) => {
    const token = req.cookies.access_token;
  if (!token) return res.status(401).json({ message: 'You are not authenticated' });

  jwt.verify(token, process.env.JWT_SECRET, (error, user) => {
    if (error) return res.status(403).json({ message: 'Token is not valid' });
    req.user = user;
    next();
  });
};
