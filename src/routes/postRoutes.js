const express = require('express');
const { createPost, updatePost, deletePost } = require('../controllers/postController');
const router = express.Router();

// Create Post
router.post('/', async (req, res) => {
  try {
    const newPost = await createPost(req.body);
    res.status(201).json(newPost);
  } catch (error) {
    console.error('Error in createPost route:', error.message);
    res.status(500).json({ message: 'Failed to create post' });
  }
});

// Get All Posts
router.get('/', async (req, res) => {
  const connection = await db.getConnection();
  try {
    const [posts] = await connection.query('SELECT * FROM posts');
    res.status(200).json(posts);
  } catch (error) {
    console.error('Error in getPosts route:', error.message);
    res.status(500).json({ message: 'Failed to fetch posts' });
  } finally {
    connection.release();
  }
});

// Get Post by ID
router.get('/:postId', async (req, res) => {
  const { postId } = req.params;
  const connection = await db.getConnection();
  try {
    const [post] = await connection.query('SELECT * FROM posts WHERE id = ?', [postId]);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.status(200).json(post);
  } catch (error) {
    console.error('Error in getPost route:', error.message);
    res.status(500).json({ message: 'Failed to fetch post' });
  } finally {
    connection.release();
  }
});

// Update Post
router.put('/:postId', async (req, res) => {
  const { postId } = req.params;
  try {
    const updatedPost = await updatePost(postId, req.body);
    res.status(200).json(updatedPost);
  } catch (error) {
    console.error('Error in updatePost route:', error.message);
    res.status(500).json({ message: 'Failed to update post' });
  }
});

// Delete Post
router.delete('/:postId', async (req, res) => {
  const { postId } = req.params;
  try {
    await deletePost(postId);
    res.status(200).json({ message: 'Post deleted successfully' });
  } catch (error) {
    console.error('Error in deletePost route:', error.message);
    res.status(500).json({ message: 'Failed to delete post' });
  }
});

module.exports = router;
