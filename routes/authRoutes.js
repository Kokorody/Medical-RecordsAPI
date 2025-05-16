const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authMiddleware = require('../middleware/authorize.middleware');

// Public routes - no authentication required
router.post('/login', authController.login);
router.post('/refresh-token', authController.refreshToken);

// Protected route - requires authentication
router.post('/register', authMiddleware, authController.register);

// Optional authentication for logout
const optionalAuth = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader?.startsWith('Bearer ')) {
    return authMiddleware(req, res, next);
  }
  next();
};

router.post('/logout', optionalAuth, authController.logout);

module.exports = router;