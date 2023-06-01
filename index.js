const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const path = require('path');
const sequelize = require('./config/connection');
const { formatDate } = require('./helpers/handlebars');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express();
const PORT = process.env.PORT || 3000;

const sessionStore = new SequelizeStore({
  db: sequelize,
});

app.use(
  session({
    secret: "secret_session_super_secret_stuff",
    resave: false,
    saveUninitialized: false,
    store: sessionStore,
    cookie: {
      maxAge: 3600000, // Set the expiration time in milliseconds (1 hour here)
    },
  })
);

const hbs = exphbs.create({
  defaultLayout: 'main',
  helpers: {
    formatDate,
  },
  partialsDir: path.join(__dirname, 'views', 'partials'), // Specify the correct path to your partials directory
});

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));

const routes = require('./controllers');
app.use(routes);

// Middleware to pass variables to all pages
app.use((req, res, next) => {
  res.locals.isUserLoggedIn = req.session.isUserLoggedIn || false;
  res.locals.isUser = req.session.user || false;
  next();
});

// Render the home page when navigating to /home
app.get('/home', (req, res) => {
  res.render('home', { isUserLoggedIn: res.locals.isUserLoggedIn });
});

// Render the dashboard page when navigating to /dashboard
app.get('/dashboard', (req, res) => {
  res.render('dashboard');
});

// Render the sign-in page when navigating to /signin
app.get('/signin', (req, res) => {
  res.render('signin');
});

// Handle logout request
const userController = require('./controllers/userController');
app.get('/users/logout', userController.logout);

// Handle signup form submission
app.post('/signup', userController.signUp);

// Handle sign-in form submission
app.post('/signin', userController.signIn);

// Sync the session store
sessionStore.sync();

sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
});
