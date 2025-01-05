const pool = require('../config/db'); // Import the MySQL connection pool

// Function to get all users
const getAllUsers = async () => {
  try {
    const [rows] = await pool.execute('SELECT * FROM users');
    return rows;
  } catch (error) {
    throw error;
  }
};

// Function to create a new user
const createUser = async (name, mobileNumber, address) => {
  try {
    const [result] = await pool.execute('INSERT INTO users (name, mobileNumber, address) VALUES (?, ?, ?)', [name, mobileNumber, address]);
    return result;
  } catch (error) {
    throw error;
  }
};

module.exports = { getAllUsers, createUser };
