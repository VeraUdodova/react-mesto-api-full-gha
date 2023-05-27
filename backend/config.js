const rateLimit = require('express-rate-limit');

require('dotenv').config();

const {
  JWT_SECRET = 'U1S52@gT5]ECPZ::F|q^hC##gl{ocRG$vh*!5F/yFAt6wHGFchBud@e.aros#SJ',
  PORT = 3000,
} = process.env;
const DB = 'mongodb://127.0.0.1:27017/mestodb';

const ALLOWED_CORS = [
  'https://vera-frontend.nomoredomains.rocks',
  'http://vera-frontend.nomoredomains.rocks',
  'http://localhost:3000',
];

const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

module.exports = {
  JWT_SECRET,
  PORT,
  DB,
  ALLOWED_CORS,
  DEFAULT_ALLOWED_METHODS,
  limiter,
};
