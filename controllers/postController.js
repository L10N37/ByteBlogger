const { Post, User, Comment } = require('../models');

const postController = {
  // Homepage - Get all posts
  getHomePage: async (req, res) => {
    try {
      // Retrieve all posts from the database
      const posts = await Post.findAll({
        include: [{ model: User, attributes: ['username'] }, { model: Comment }],
        order: [['createdAt', 'DESC']],
      });

      // Render the homepage view with the retrieved posts
      res.render('homepage', { posts });
    } catch (error) {
      res.status(500).json({ message: 'Error retrieving posts', error: error.message });
    }
  },

  // Create a new post
  createPost: async (req, res) => {
    try {
      // Get post input from the request body
      const { title, content } = req.body;

      // Create a new post in the database
      await Post.create({ title, content, userId: req.session.userId });

      // Redirect to the dashboard
      res.redirect('/dashboard');
    } catch (error) {
      res.status(500).json({ message: 'Error creating post', error: error.message });
    }
  },

  // Update a post
  updatePost: async (req, res) => {
    try {
      // Get post input from the request body
      const { title, content } = req.body;

      // Find the post in the database
      const post = await Post.findByPk(req.params.id);

      // If the post doesn't exist or is not created by the current user, return an error
      if (!post || post.userId !== req.session.userId) {
        return res.status(404).json({ message: 'Post not found' });
      }

      // Update the post with the new input
      post.title = title;
      post.content = content;
      await post.save();

      // Redirect to the dashboard
      res.redirect('/dashboard');
    } catch (error) {
      res.status(500).json({ message: 'Error updating post', error: error.message });
    }
  },

  // Delete a post
  deletePost: async (req, res) => {
    try {
      // Find the post in the database
      const post = await Post.findByPk(req.params.id);

      // If the post doesn't exist or is not created by the current user, return an error
      if (!post || post.userId !== req.session.userId) {
        return res.status(404).json({ message: 'Post not found' });
      }

      // Delete the post from the database
      await post.destroy();

      // Redirect to the dashboard
      res.redirect('/dashboard');
    } catch (error) {
      res.status(500).json({ message: 'Error deleting post', error: error.message });
    }
  },

  // View post details
  viewPost: async (req, res) => {
    try {
      // Find the post in the database
      const post = await Post.findByPk(req.params.id, {
        include: [{ model: User, attributes: ['username'] }, { model: Comment, include: [User] }],
    });

    // If the post doesn't exist, return an error
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    // Render the post details view with the retrieved post
    res.render('post', { post });
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving post details', error: error.message });
  }
},

// Leave a comment on a post
leaveComment: async (req, res) => {
  try {
    // Get comment input from the request body
    const { content } = req.body;

    // Create a new comment in the database
    await Comment.create({ content, postId: req.params.id, userId: req.session.userId });

    // Redirect to the post details
    res.redirect(`/posts/${req.params.id}`);
  } catch (error) {
    res.status(500).json({ message: 'Error leaving comment', error: error.message });
  }
},
};

module.exports = postController;
