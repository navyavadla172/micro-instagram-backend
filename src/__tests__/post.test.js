const request = require('supertest');
const app = require('../index'); // Assuming this is correct

describe('Post Routes', () => {
  let postId; // Variable to store post ID for testing

  // Test case to create a post
  it('should create a post', async () => {
    const newPost = {
      title: 'Test Post',
      description: 'Test Description',
      images: ['image1.png'],
      userId: 1
    };

    const res = await request(app).post('/api/posts').send(newPost);
    expect(res.status).toBe(201);
    expect(res.body.title).toBe(newPost.title);
    expect(res.body.description).toBe(newPost.description);
    expect(res.body.images).toEqual(newPost.images);

    // Store the postId for use in update and delete tests
    postId = res.body.id;
  });

  // Test case to update a post
  it('should update a post', async () => {
    const updatedPost = {
      title: 'Updated Post',
      description: 'Updated Description',
      images: ['updatedImage.png']
    };

    const res = await request(app).put(`/api/posts/${postId}`).send(updatedPost);
    expect(res.status).toBe(200);
    expect(res.body.title).toBe(updatedPost.title);
    expect(res.body.description).toBe(updatedPost.description);
    expect(res.body.images).toEqual(updatedPost.images);
  });

  // Test case to delete a post
  it('should delete a post', async () => {
    const res = await request(app).delete(`/api/posts/${postId}`);
    expect(res.status).toBe(200);
    expect(res.body.message).toBe('Post deleted successfully');
  });
});
