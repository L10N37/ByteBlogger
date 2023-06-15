const express = require('express');
const router = express.Router();

const { User, Post } = require('../models'); // Import the User and Post models

// Define the associations
User.hasMany(Post, {
  foreignKey: 'user_id',
  as: 'user', // Add the alias 'user'
  onDelete: 'CASCADE',
});

Post.belongsTo(User, {
  foreignKey: 'user_id',
});

// Import your controllers
const userController = require('./userController');
const postController = require('./postController');
const commentController = require('./commentController');

// Middleware to pass variables to all pages
router.use((req, res, next) => {
  res.locals.isUserLoggedIn = req.session.isUserLoggedIn || false;
  res.locals.isUser = req.session.user || false;
  next();
});

/* -------------------- Route definitions -------------------- */

/*  Post Controller */  //--------------------------------------
// View a post
router.get('/posts/:id', postController.viewPost);

// Edit a post
router.get('/posts/:id/edit', postController.getEditPostForm);

// Create a new post
router.post('/posts', postController.createPost);

// Update a post
router.post('/posts/:id/update', postController.updatePost);

// Delete a post
router.delete('/posts/:id', postController.deletePost);

// View a post
router.get('/posts/:id', postController.viewPost);

// Render the dashboard page with posts by the logged-in user
router.get('/dashboard', postController.getDashboard);

// Render the homepage when navigating to /home
router.get('/home', postController.getHomePage);
//--------------------------------------------------------------

/*  User Controller */
// Handle signup form submission
router.post('/signup', userController.signUp);
// Handle sign-in form submission
router.post('/signin', userController.signIn);

// Handle logout request
router.get('/users/logout', userController.logout);
//--------------------------------------------------------------

/* -------------------- Comment Controller -------------------- */
// Leave a comment
router.post('/comments/:id', commentController.leaveComment);
//--------------------------------------------------------------

/*      Rendering      */
// Render the sign-in page
router.get('/signin', (req, res) => {
  res.render('signin');
});

// Render the post page with associated comments
router.get('/posts/:id', async (req, res) => {
  try {
    const postId = req.params.id;
    const post = await Post.findByPk(postId, {
      include: [{ model: Comment, include: [User] }],
    });

    res.render('post', { post });
  } catch (error) {
    console.error('Error retrieving post and comments:', error);
    res.sendStatus(500);
  }
});

// Render the dashboard page
router.get('/dashboard', (req, res) => {
  res.render('dashboard');
});

// export all router definitions
module.exports = router;
