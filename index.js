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
  // Pass additional variables to be accessible in all templates using 'main' layout
  runtimeOptions: {
    data: {
      isUserLoggedIn: req => req.session.isUserLoggedIn || false,
      isUser: req => req.session.user || false,
    },
  },
});

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));

const routes = require('./controllers');
app.use(routes);

// Sync the session store
sessionStore.sync();

sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
});
