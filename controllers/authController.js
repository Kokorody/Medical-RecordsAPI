const authService = require('../services/auth.service');
const pool = require('../models/db');

const authController = {
  // Register new user
  register: async (req, res) => {
    try {
      const { username, password, role = 'user' } = req.body;
      
      // Check if user already exists
      const [existingUsers] = await pool.query('SELECT * FROM users WHERE username = ?', [username]);
      if (existingUsers.length > 0) {
        return res.status(400).json({ message: 'Username already exists' });
      }
      
      // Hash password
      const hashedPassword = await authService.hashPassword(password);
      
      // Create new user
      const [result] = await pool.query(
        'INSERT INTO users (username, password, role) VALUES (?, ?, ?)',
        [username, hashedPassword, role]
      );
      
      const userId = result.insertId;
      const user = { id: userId, username, role };
      
      // Generate tokens
      const { accessToken, refreshToken } = await authService.generateTokens(user);
      
      // Store refresh token
      await authService.storeRefreshToken(userId, refreshToken);
      
      res.status(201).json({
        message: 'User registered successfully',
        user: { id: userId, username, role },
        accessToken,
        refreshToken
      });
    } catch (error) {
      console.error('Registration error:', error);
      res.status(500).json({ message: 'Registration failed', error: error.message });
    }
  },
  
  // Login user
  login: async (req, res) => {
    try {
      const { username, password } = req.body;
      
      // Find user
      const [users] = await pool.query('SELECT * FROM users WHERE username = ?', [username]);
      if (users.length === 0) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
      
      const user = users[0];
      
      // Check password
      const isValidPassword = await authService.comparePassword(password, user.password);
      if (!isValidPassword) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
      
      // Generate tokens
      const { accessToken, refreshToken } = await authService.generateTokens(user);
      
      // Store refresh token
      await authService.storeRefreshToken(user.id, refreshToken);
      
      res.status(200).json({
        message: 'Login successful',
        user: { id: user.id, username: user.username, role: user.role },
        accessToken,
        refreshToken
      });
    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({ message: 'Login failed', error: error.message });
    }
  },
  
  // Refresh token
  refreshToken: async (req, res) => {
    try {
      const { refreshToken } = req.body;
      
      if (!refreshToken) {
        return res.status(400).json({ message: 'Refresh token is required' });
      }
      
      // Verify refresh token
      const { valid, expired, decoded } = authService.verifyRefreshToken(refreshToken);
      
      if (!valid) {
        return res.status(401).json({
          message: expired ? 'Refresh token has expired' : 'Invalid refresh token',
          expired
        });
      }
      
      // Check if token version is still valid
      const isValidVersion = await authService.isTokenVersionValid(decoded.id, decoded.tokenVersion);
      if (!isValidVersion) {
        return res.status(401).json({ message: 'Refresh token has been revoked' });
      }
      
      // Check if stored refresh token matches
      const storedRefreshToken = await authService.findRefreshToken(decoded.id);
      if (storedRefreshToken !== refreshToken) {
        return res.status(401).json({ message: 'Refresh token is not valid' });
      }
      
      // Generate new tokens
      const user = { id: decoded.id, username: decoded.username, role: decoded.role };
      const tokens = await authService.generateTokens(user);
      
      // Store new refresh token
      await authService.storeRefreshToken(decoded.id, tokens.refreshToken);
      
      res.status(200).json({
        message: 'Token refreshed successfully',
        accessToken: tokens.accessToken,
        refreshToken: tokens.refreshToken
      });
    } catch (error) {
      console.error('Token refresh error:', error);
      res.status(500).json({ message: 'Token refresh failed', error: error.message });
    }
  },
  
  // Logout user
  logout: async (req, res) => {
    try {
      // Get userId either from authenticated request or from body
      let userId;
      
      if (req.user && req.user.id) {
        // Get from authenticated session
        userId = req.user.id;
      } else if (req.body && req.body.userId) {
        // Get from request body (for swagger compatibility)
        userId = req.body.userId;
      } else {
        return res.status(400).json({ message: 'User ID is required' });
      }
      
      // Invalidate all tokens for this user by incrementing the token version
      await authService.invalidateUserTokens(userId);
      
      res.status(200).json({ message: 'Logged out successfully' });
    } catch (error) {
      console.error('Logout error:', error);
      res.status(500).json({ message: 'Logout failed', error: error.message });
    }
  }
};

module.exports = authController;