const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const pool = require('../models/db');
const jwtConfig = require('../config/jwt.config');

const authService = {
  // Generate tokens
  generateTokens: (user) => {
    // Remove sensitive data from user object
    const userDataForToken = {
      id: user.id,
      username: user.username,
      role: user.role
    };
    
    // Create access token
    const accessToken = jwt.sign(
      userDataForToken,
      jwtConfig.jwtSecret,
      { expiresIn: jwtConfig.accessTokenExpiry }
    );
    
    // Create refresh token
    const refreshToken = jwt.sign(
      userDataForToken,
      jwtConfig.jwtRefreshSecret,
      { expiresIn: jwtConfig.refreshTokenExpiry }
    );
    
    return { accessToken, refreshToken };
  },
  
  // Verify access token
  verifyAccessToken: (token) => {
    try {
      const decoded = jwt.verify(token, jwtConfig.jwtSecret);
      return { valid: true, expired: false, decoded };
    } catch (error) {
      return {
        valid: false,
        expired: error.name === 'TokenExpiredError',
        decoded: null
      };
    }
  },
  
  // Verify refresh token
  verifyRefreshToken: (token) => {
    try {
      const decoded = jwt.verify(token, jwtConfig.jwtRefreshSecret);
      return { valid: true, expired: false, decoded };
    } catch (error) {
      return {
        valid: false,
        expired: error.name === 'TokenExpiredError',
        decoded: null
      };
    }
  },
  
  // Store refresh token in database
  storeRefreshToken: async (userId, refreshToken) => {
    try {
      await pool.query('UPDATE users SET refresh_token = ? WHERE id = ?', [refreshToken, userId]);
      return true;
    } catch (error) {
      console.error('Error storing refresh token:', error);
      return false;
    }
  },
  
  // Find refresh token in database
  findRefreshToken: async (userId) => {
    try {
      const [rows] = await pool.query('SELECT refresh_token FROM users WHERE id = ?', [userId]);
      if (rows.length === 0) return null;
      return rows[0].refresh_token;
    } catch (error) {
      console.error('Error finding refresh token:', error);
      return null;
    }
  },
  
  // Remove refresh token from database
  removeRefreshToken: async (userId) => {
    try {
      await pool.query('UPDATE users SET refresh_token = NULL WHERE id = ?', [userId]);
      return true;
    } catch (error) {
      console.error('Error removing refresh token:', error);
      return false;
    }
  },
  
  // Hash password
  hashPassword: async (password) => {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
  },
  
  // Compare password
  comparePassword: async (password, hashedPassword) => {
    return bcrypt.compare(password, hashedPassword);
  }
};

module.exports = authService;