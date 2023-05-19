const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { registration, login } = require('./controllers/users');
const { errorHandler } = require('./utils/utils');
const NotFoundError = require('./errors/not-found-err');
const auth = require('./middlewares/auth');
const { signupValidator, signinValidator } = require('./validators/users');
const { DB } = require('./config');

const app = express();

mongoose.connect(DB);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(requestLogger);
app.use('/signin', signinValidator, login);
app.use('/signup', signupValidator, registration);
app.use('/users', auth, require('./routes/users'));
app.use('/cards', auth, require('./routes/cards'));

app.use('/', (req, res, next) => {
  next(new NotFoundError());
});
app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

module.exports = app;
