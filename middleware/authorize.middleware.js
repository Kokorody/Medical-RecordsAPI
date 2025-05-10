const authService = require('../services/auth.service');

const authMiddleware = async (req, res, next) => {
  try {
    // Get authorization header
    const authHeader = req.headers.authorization;
    
    if (!authHeader?.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Access token is required' });
    }
    
    // Extract token
    const token = authHeader.split(' ')[1];
    
    // Verify token
    const { valid, expired, decoded } = authService.verifyAccessToken(token);
    
    if (!valid) {
      return res.status(401).json({
        message: expired ? 'Token has expired' : 'Invalid token',
        expired
      });
    }
    
    // Attach user to request
    req.user = decoded;
    
    next();
  } catch (error) {
    console.error('Authentication error:', error);
    res.status(500).json({ message: 'Authentication error', error: error.message });
  }
};

module.exports = authMiddleware;