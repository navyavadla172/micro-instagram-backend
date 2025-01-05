const express = require('express');
const { getAllUsers, createUser } = require('../models/user'); // Import model functions
const router = express.Router();

// Route to get all users
router.get('/', async (req, res) => {
  try {
    const users = await getAllUsers();
    res.status(200).json(users); // Send users as JSON response
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Error fetching users', error: error.message });
  }
});

// Route to create a new user
router.post('/', async (req, res) => {
  const { name, mobileNumber, address } = req.body;

  // Simple validation for missing fields
  if (!name || !mobileNumber || !address) {
    return res.status(400).json({ message: 'Name, mobileNumber, and address are required' });
  }

  try {
    const result = await createUser(name, mobileNumber, address);
    res.status(201).json({ message: 'User created successfully', userId: result.insertId });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ message: 'Error creating user', error: error.message });
  }
});

module.exports = router; // Export routes for use in the app
