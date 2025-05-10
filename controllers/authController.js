const pool = require('../models/db');
const authService = require('../services/auth.service');

exports.register = async (req, res) => {
  try {
    const { username, password, role = 'user' } = req.body;
    
    // Check if user already exists
    const [existingUser] = await pool.query('SELECT * FROM users WHERE username = ?', [username]);
    if (existingUser.length > 0) {
      return res.status(400).json({ message: 'User already exists' });
    }
    
    // Hash password
    const hashedPassword = await authService.hashPassword(password);
    
    // Create user
    const [result] = await pool.query(
      'INSERT INTO users (username, password, role) VALUES (?, ?, ?)',
      [username, hashedPassword, role]
    );
    
    res.status(201).json({ message: 'User registered successfully', userId: result.insertId });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Error registering user', error: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    
    // Find user
    const [users] = await pool.query('SELECT * FROM users WHERE username = ?', [username]);
    if (users.length === 0) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    
    const user = users[0];
    
    // Verify password
    const isPasswordValid = await authService.comparePassword(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    
    // Generate tokens
    const { accessToken, refreshToken } = authService.generateTokens(user);
    
    // Store refresh token
    await authService.storeRefreshToken(user.id, refreshToken);
    
    // Send response
    res.status(200).json({
      message: 'Login successful',
      accessToken,
      refreshToken,
      user: {
        id: user.id,
        username: user.username,
        role: user.role
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Error logging in', error: error.message });
  }
};

exports.refreshToken = async (req, res) => {
  try {
    const { refreshToken } = req.body;
    
    if (!refreshToken) {
      return res.status(400).json({ message: 'Refresh token is required' });
    }
    
    // Verify refresh token
    const refreshTokenData = authService.verifyRefreshToken(refreshToken);
    if (!refreshTokenData.valid) {
      return res.status(401).json({ message: 'Invalid refresh token' });
    }
    
    // Get user
    const [users] = await pool.query('SELECT * FROM users WHERE id = ?', [refreshTokenData.decoded.id]);
    if (users.length === 0) {
      return res.status(401).json({ message: 'User not found' });
    }
    
    const user = users[0];
    
    // Check if refresh token matches
    const storedRefreshToken = await authService.findRefreshToken(user.id);
    if (storedRefreshToken !== refreshToken) {
      return res.status(401).json({ message: 'Refresh token is invalid' });
    }
    
    // Generate new tokens
    const tokens = authService.generateTokens(user);
    
    // Store new refresh token
    await authService.storeRefreshToken(user.id, tokens.refreshToken);
    
    // Send response
    res.status(200).json({
      message: 'Token refreshed successfully',
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken
    });
  } catch (error) {
    console.error('Token refresh error:', error);
    res.status(500).json({ message: 'Error refreshing token', error: error.message });
  }
};

exports.logout = async (req, res) => {
  try {
    const { userId } = req.body;
    
    if (!userId) {
      return res.status(400).json({ message: 'User ID is required' });
    }
    
    // Remove refresh token
    await authService.removeRefreshToken(userId);
    
    res.status(200).json({ message: 'Logout successful' });
  } catch (error) {
    console.error('Logout error:', error);
    res.status(500).json({ message: 'Error logging out', error: error.message });
  }
};