const { Comment } = require('../models');

const commentController = {
  // Leave a comment on a post
  leaveComment: async (req, res) => {
    try {
      // Get comment input from the request body
      const { comment_text } = req.body;
    
      // Create a new comment in the database
      const comment = await Comment.create({
        comment_text,
        post_id: req.params.id,
        user_id: req.session.userId,
      });

      // Log the comment to the console
      console.log('New Comment:', comment);


      // Refresh the page to show the updated comments
      res.redirect(`/posts/${req.params.id}`);
    } catch (error) {
      res.status(500).json({ message: 'Error leaving comment', error: error.message });
    }
  },
};

module.exports = commentController;
