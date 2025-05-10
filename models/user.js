const pool = require('./db');
const bcrypt = require('bcrypt');

// run nih code utk create table users
const createUsersTable = async () => {
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      username VARCHAR(255) NOT NULL UNIQUE,
      password VARCHAR(255) NOT NULL,
      role VARCHAR(50) DEFAULT 'user',
      refresh_token TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )
  `;
  
  try {
    await pool.query(createTableQuery);
    console.log('Users table checked/created');
  } catch (error) {
    console.error('Error creating users table:', error);
  }
};

// Call this function when your app starts
createUsersTable();