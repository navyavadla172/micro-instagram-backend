// src/index.js

const express = require('express');
const userRoutes = require('./routes/userRoutes');  // Import user routes
const postRoutes = require('./routes/postRoutes');  // Import post routes
require('dotenv').config();  // Load environment variables from .env file

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());  // Middleware to parse JSON requests
app.use('/api/users', userRoutes);  // Route to handle user-related requests
app.use('/api/posts', postRoutes);  // Route to handle post-related requests

// Middleware to handle 404 for undefined routes
app.use((req, res, next) => {
  res.status(404).json({ message: 'Route not found' });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Error:', err.stack);
  res.status(500).json({ message: 'Something went wrong', error: err.message });
});

// Export app for testing purposes
module.exports = app;

// Start the server if not in test environment
if (process.env.NODE_ENV !== 'test') {
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
}

module.exports = app;