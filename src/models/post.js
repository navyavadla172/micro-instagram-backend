const pool = require('../config/db'); // Import the MySQL connection pool

// Function to get all posts
const getAllPosts = async () => {
  try {
    const [rows] = await pool.execute('SELECT * FROM posts');
    return rows;
  } catch (error) {
    console.error('Error fetching all posts:', error.message);
    throw new Error('Failed to fetch posts');
  }
};

// Function to get posts by user
const getPostsByUser = async (userId) => {
  try {
    if (!userId) {
      throw new Error('User ID is required');
    }
    const [rows] = await pool.execute('SELECT * FROM posts WHERE userId = ?', [userId]);
    return rows;
  } catch (error) {
    console.error(`Error fetching posts for user ${userId}:`, error.message);
    throw new Error('Failed to fetch user posts');
  }
};

// Function to create a new post
const createPost = async (title, description, images, userId) => {
  try {
    if (!title || !description || !userId) {
      throw new Error('Title, description, and userId are required');
    }
    
    // Validate userId
    if (isNaN(userId) || userId <= 0) {
      throw new Error('Invalid user ID');
    }

    const jsonImages = JSON.stringify(images || []);

    // Check if the user exists by querying the user table
    const [user] = await pool.execute('SELECT * FROM users WHERE id = ?', [userId]);
    if (user.length === 0) {
      throw new Error('User does not exist');
    }

    // Start a transaction to handle both post creation and post count update
    await pool.beginTransaction();

    // Create the post
    const [result] = await pool.execute(
      'INSERT INTO posts (title, description, images, userId) VALUES (?, ?, ?, ?)', 
      [title, description, jsonImages, userId]
    );

    // Update the post count in the user table
    await pool.execute(
      'UPDATE users SET postCount = postCount + 1 WHERE id = ?',
      [userId]
    );

    await pool.commit();

    return { id: result.insertId, title, description, images };
  } catch (error) {
    await pool.rollback();
    console.error('Error creating post:', error.message);
    throw new Error('Failed to create post');
  }
};

module.exports = { getAllPosts, getPostsByUser, createPost };
