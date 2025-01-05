const db = require('../config/db');

const createPost = async (postData) => {
  const connection = await db.getConnection();
  try {
    await connection.beginTransaction();

    // Ensure the userId is valid
    if (!postData.userId) {
      throw new Error('User ID is required');
    }

    // Check if the user exists
    const [user] = await connection.query('SELECT * FROM users WHERE id = ?', [postData.userId]);
    if (!user || user.length === 0) {
      throw new Error('User does not exist');
    }

    const [result] = await connection.query('INSERT INTO posts (title, description, images, userId) VALUES (?, ?, ?, ?)', 
      [postData.title, postData.description, JSON.stringify(postData.images), postData.userId]);

    await connection.commit();

    return { id: result.insertId, ...postData };
  } catch (error) {
    await connection.rollback();
    console.error('Error creating post:', error.message);
    throw new Error('Failed to create post');
  } finally {
    connection.release();
  }
};

const updatePost = async (postId, updateData) => {
  const connection = await db.getConnection();
  try {
    await connection.beginTransaction();

    // Ensure postId is valid
    if (!postId) {
      throw new Error('Post ID is required');
    }

    const [result] = await connection.query('UPDATE posts SET title = ?, description = ?, images = ? WHERE id = ?', 
      [updateData.title, updateData.description, JSON.stringify(updateData.images), postId]);
    
    if (result.affectedRows === 0) {
      throw new Error('Post not found');
    }

    await connection.commit();
    return { postId, ...updateData };
  } catch (error) {
    await connection.rollback();
    console.error('Error updating post:', error.message);
    throw new Error('Failed to update post');
  } finally {
    connection.release();
  }
};

const deletePost = async (postId) => {
  const connection = await db.getConnection();
  try {
    await connection.beginTransaction();

    // Ensure postId is valid
    if (!postId) {
      throw new Error('Post ID is required');
    }

    const [result] = await connection.query('DELETE FROM posts WHERE id = ?', [postId]);

    if (result.affectedRows === 0) {
      throw new Error('Post not found');
    }

    await connection.commit();
    return true;
  } catch (error) {
    await connection.rollback();
    console.error('Error deleting post:', error.message);
    throw new Error('Failed to delete post');
  } finally {
    connection.release();
  }
};

module.exports = {
  createPost,
  updatePost,
  deletePost,
};
