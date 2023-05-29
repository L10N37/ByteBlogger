const express = require('express');
const router = express.Router();

// Import your controllers
const userController = require('./userController');
const postController = require('./postController');
const commentController = require('./commentController');

// Define your routes
router.post('/users/signup', userController.signUp);
router.post('/users/signin', userController.signIn);
router.post('/users/logout', userController.logout);

router.get('/', postController.getHomePage);
router.post('/posts', postController.createPost);
router.put('/posts/:id', postController.updatePost);
router.delete('/posts/:id', postController.deletePost);
router.get('/posts/:id', postController.viewPost);

router.post('/comments/:id', commentController.leaveComment);

module.exports = router;
