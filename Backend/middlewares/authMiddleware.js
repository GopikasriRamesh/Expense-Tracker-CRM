// Backend/middleware/authMiddleware.js
const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.protect = async (req, res, next) => {
  let token;

  // Get token from header
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1]; // ✅ correct extraction
  }

  if (!token) {
    return res.status(401).json({ message: 'Not authorized, no token' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // ✅ verify
    req.user = await User.findById(decoded.id).select('-password'); // ✅ attach user
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Not authorized, token failed', error: error.message });
  }
};
