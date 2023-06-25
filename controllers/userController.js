const { User } = require('../models');

// Function to validate the password field, set to at least one capital letter and at least one special character (including exclamation mark)
function validatePassword(password) {
  const regex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
  if (!regex.test(password)) {
    return {
      isValid: false,
      message: 'Password must contain at least 8 characters, one capital letter, and one special character.',
    };
  }
  return {
    isValid: true,
  };
}

const userController = {

  // Sign up functionality
  signUp: async (req, res) => {
    try {
      const { username, password } = req.body;

      // Check if the username already exists in the database
      const existingUser = await User.findOne({ where: { username } });
      if (existingUser) {
        return res.status(409).json({ message: 'Username already exists. Please choose a different username.' });
      }

      // Validate password using the validatePassword function
      const passwordValidation = validatePassword(password);
      if (!passwordValidation.isValid) {
        return res.status(400).json({ message: passwordValidation.message });
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
      // store username in session/cookie
      req.session.user = username;
      // Set isUserLoggedIn boolean to true in session/cookie
      req.session.isUserLoggedIn = true;
      // Store userID in session/cookie
      req.session.userId = user.id;

      req.session.save(() => {
        res.json({ success: true, message: 'You are now logged in!', redirectUrl: '/home' });
      });
    } catch (error) {
      res.status(500).json({ message: 'Error signing in user', error: error.message });
    }
  },

// Logout functionality
logout: (req, res) => {
  try {
    req.session.destroy(() => {
      res.clearCookie('connect.sid'); // Clear the session cookie
      res.redirect('/signin'); // Redirect to the homepage or login page
    });
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