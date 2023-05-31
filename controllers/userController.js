const bcrypt = require('bcrypt');
const { User } = require('../models');
const session = require('express-session');

const userController = {
  // Sign up functionality
  signUp: async (req, res) => {
    try {
      // Get user input from the request body
      const { username, password } = req.body;

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create a new user in the database
      const user = await User.create({ username, password: hashedPassword });

      // Set the user's ID in the session
      req.session.userId = user.id;

      // Send a response or redirect to the desired page
      res.status(201).json({ message: 'User created successfully', user });
    } catch (error) {
      res.status(500).json({ message: 'Error signing up user', error: error.message });
    }
  },

  // Sign in functionality
  signIn: async (req, res) => {
    try {
      // Get user input from the request body
      const { username, password } = req.body;

      // Find the user in the database
      const user = await User.findOne({ where: { username } });

      // If user not found or password doesn't match, return an error
      if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({ message: 'Invalid username or password' });
      }

      // Set the user's ID in the session
      req.session.userId = user.id;

      // Send a response or redirect to the desired page
      res.status(200).json({ message: 'User signed in successfully', user });
    } catch (error) {
      res.status(500).json({ message: 'Error signing in user', error: error.message });
    }
  },

  // Logout functionality
  logout: (req, res) => {
    try {
      // Destroy the session data
      req.session.destroy();

      // Send a response or redirect to the desired page
      res.status(200).json({ message: 'User logged out successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error logging out user', error: error.message });
    }
  },
};

module.exports = userController;
