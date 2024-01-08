// server.js

const express = require('express');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bodyParser = require('body-parser');
const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'your_database',
  password: 'rahultelugu88',
  port: 5432,
});

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(session({ secret: 'your_secret_key', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(
  (username, password, done) => {
    // Replace this with your actual authentication logic
    if (username === 'user' && password === 'password') {
      return done(null, { id: 1, username: 'user' });
    } else {
      return done(null, false, { message: 'Incorrect username or password' });
    }
  }
));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  // Replace this with your actual logic to retrieve user from the database
  done(null, { id: 1, username: 'user' });
});

const authenticateUser = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.status(401).json({ message: 'Unauthorized' });
  }
};

app.post('/login', passport.authenticate('local'), (req, res) => {
  res.json({ message: 'Login successful' });
});

app.get('/logout', (req, res) => {
  req.logout();
  res.json({ message: 'Logout successful' });
});

app.post('/login', passport.authenticate('local'), (req, res) => {
  res.json({ message: 'Login successful' });
});

app.get('/logout', (req, res) => {
  req.logout();
  res.json({ message: 'Logout successful' });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
