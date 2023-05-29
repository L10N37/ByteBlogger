const { Comment } = require('../models');

const commentController = {
  // Leave a comment on a post
  leaveComment: async (req, res) => {
    try {
      // Get comment input from the request body
      const { content } = req.body;

      // Create a new comment in the database
      const comment = await Comment.create({
        content,
        postId: req.params.id,
        userId: req.session.userId,
      });

      // Redirect to the post details
      res.redirect(`/posts/${req.params.id}`);
    } catch (error) {
      res.status(500).json({ message: 'Error leaving comment', error: error.message });
    }
  },
};

module.exports = commentController;
