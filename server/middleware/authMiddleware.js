// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');

// Middleware om JWT te verifiëren
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  console.log('Auth Header:', authHeader); // Log de auth header
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) {
    console.log('No token provided');
    return res.status(401).json({ message: 'Access Denied' });
  }

  try {
    const verified = jwt.verify(token, 'secret');
    console.log('Token verified:', verified); // Log de verified token
    req.user = verified;
    next();
  } catch (err) {
    console.log('Invalid Token');
    res.status(400).json({ message: 'Invalid Token' });
  }
}

module.exports = { authenticateToken };
