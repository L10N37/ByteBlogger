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

// Define your routes
router.post('/users/signup', userController.signUp);
router.post('/users/signin', userController.signIn);
router.post('/users/logout', userController.logout);

router.get('/home', postController.getHomePage);
router.post('/posts', postController.createPost);
router.put('/posts/:id', postController.updatePost);
router.delete('/posts/:id', postController.deletePost);
router.get('/posts/:id', postController.viewPost);

router.post('/comments/:id', commentController.leaveComment);

module.exports = router;
