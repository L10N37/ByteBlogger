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

// Route definitions

// Render the dashboard page with posts by the logged-in user
router.get('/dashboard', postController.getDashboard);

// Render the homepage when navigating to /home
router.get('/home', postController.getHomePage);

// Handle signup form submission
router.post('/signup', userController.signUp);

// Handle sign-in form submission
router.post('/signin', userController.signIn);

// Handle logout request
router.get('/users/logout', userController.logout);

// Create a new post
router.post('/posts', postController.createPost);

// Update a post
router.put('/posts/:id', postController.updatePost);

// Delete a post
router.delete('/posts/:id', postController.deletePost);

// View a post
router.get('/posts/:id', postController.viewPost);

// Leave a comment
router.post('/comments/:id', commentController.leaveComment);

// Render the sign-in page
router.get('/signin', (req, res) => {
  res.render('signin');
});

// Render the dashboard page
router.get('/dashboard', (req, res) => {
  res.render('dashboard');
});

module.exports = router;
