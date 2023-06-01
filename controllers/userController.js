const bcrypt = require('bcrypt');
const { User } = require('../models');

const userController = {

  // Sign up functionality
  signUp: async (req, res) => {
    try {
      const { username, password } = req.body;
      const usernameExists = await userController.checkUsername(username);
      if (usernameExists) {
        return res.status(409).json({ message: 'Username already exists. Please choose a different username.' });
      }
      const user = User.build({ username });
      user.password = password; // Set the password explicitly
      await user.save({ hooks: false });
      req.session.userId = user.id;
      res.status(201).json({ message: 'User created successfully', user });
    } catch (error) {
      res.status(500).json({ message: 'Error signing up user', error: error.message });
    }
  },
  
  // Sign in functionality
  signIn: async (req, res) => {
    try {
      const { username, password } = req.body;
      const user = await User.findOne({ where: { username } });
      if (!user) {
        return res.status(401).json({ message: 'User not found, please sign up!' });
      }
      const passwordBuffer = Buffer.from(password, 'utf-8');
      const validPassword = await user.checkPassword(passwordBuffer);
      if (!validPassword) {
        return res.status(401).json({ message: 'Incorrect password, please try again' });
      }
      req.session.user = username;
      // Set isUserLoggedIn in session
      req.session.isUserLoggedIn = true;
      req.session.save(() => {
        res.json({ user, message: 'You are now logged in!' });
      });
    } catch (error) {
      res.status(500).json({ message: 'Error signing in user', error: error.message });
    }
  },

  // Logout functionality
  logout: (req, res) => {
    try {
      req.session.destroy();
      res.status(200).json({ message: 'User logged out successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error logging out user', error: error.message });
    }
  },

  // Utility function to check if a username already exists
  checkUsername: async (username) => {
    const existingUser = await User.findOne({ where: { username } });
    return existingUser ? true : false;
  },
};

module.exports = userController;