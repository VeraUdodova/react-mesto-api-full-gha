const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { registration, login } = require('./controllers/users');
const { errorHandler } = require('./utils/utils');
const NotFoundError = require('./errors/not-found-err');
const auth = require('./middlewares/auth');
const { signupValidator, signinValidator } = require('./validators/users');
const { DB, ALLOWED_CORS, DEFAULT_ALLOWED_METHODS } = require('./config');

const app = express();

mongoose.connect(DB);

app.use((req, res, next) => {
  const { origin } = req.headers;
  const requestHeaders = req.headers['access-control-request-headers'];
  const { method } = req;

  if (ALLOWED_CORS.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }

  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    res.header('Access-Control-Allow-Headers', requestHeaders);
    return res.end();
  }

  next();
  return true;
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(requestLogger);
app.use('/signin', signinValidator, login);
app.use('/signup', signupValidator, registration);
app.use('/users', auth, require('./routes/users'));
app.use('/cards', require('./routes/cards'));

app.use('/', (req, res, next) => {
  next(new NotFoundError());
});
app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

module.exports = app;
