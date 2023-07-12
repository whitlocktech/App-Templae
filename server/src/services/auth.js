const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const jwt = require('jsonwebtoken');
const User = require('../models/users/users.model');
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error('JWT_SECRET must be provided');
}

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const user = await User.getUserByUsername(username);
      if (!user) {
        return done(null, false, { message: 'Incorrect username or password' });
      }
      const isPasswordValid = await User.comparePasswords(password, user.password);

      if (!isPasswordValid) {
        return done(null, false, { message: 'Incorrect password or password' });
      }
      return done(null, user, { message: 'Logged in successfully' });
    } catch (error) {
      return done(error);
    }
  })
);

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.getUserById(id);
    done(null, user);
  } catch (error) {
    done(error);
  }
});

function generateToken(user) {
  const payload = {
    _id: user._id,
    username: user.username,
    role: user.role,
  };
  const options = { expiresIn: '1d' };
  return jwt.sign(payload, JWT_SECRET, options);
}

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.substring(7);
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: 'Unauthorized' });
      }
      req.user = decoded;
      return next();
    });
  } else {
    return res.status(401).json({ message: 'Unauthorized' });
  }
}

function isAdmin(req, res, next) {
  const authHeader = req.headers.authorization;

  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.substring(7);

    jwt.verify(token, JWT_SECRET, (err, decoded) => {
      if (err || decoded.role !== 'admin') {
        return res.status(403).json({ message: 'Forbidden' });
      }
      req.user = decoded;
      return next();
    });
  } else {
    return res.status(401).json({ message: 'Unauthorized' });
  }
}

module.exports = {
  passport,
  generateToken,
  isLoggedIn,
  isAdmin,
};
