const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const path = require('path');
const sequelize = require('./config/connection'); // Import the sequelize connection

const app = express();
const PORT = process.env.PORT || 3000;

// Configure session
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

// Set up handlebars engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// Configure body parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Import and use routes
const routes = require('./controllers');
app.use(routes);

// Define the route for the homepage
app.get('/', (req, res) => {
  const posts = []; // Retrieve posts from the database as needed

  res.render('homepage', { asciiArtText, blogPosts: posts });
});

// Start the server
sequelize.sync().then(() => { // Sync the sequelize models with the database
  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
});
