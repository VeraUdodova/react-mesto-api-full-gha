require('dotenv').config();

const {
  JWT_SECRET = 'U1S52@gT5]ECPZ::F|q^hC##gl{ocRG$vh*!5F/yFAt6wHGFchBud@e.aros#SJ',
  PORT = 3000,
} = process.env;
const DB = 'mongodb://127.0.0.1:27017/mestodb1';

const allowedCors = [
  'https://vera-frontend.nomoredomains.rocks',
  'http://vera-frontend.nomoredomains.rocks',
  'http://localhost:3000',
];
const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';

module.exports = {
  JWT_SECRET,
  PORT,
  DB,
  ALLOWED_CORS: allowedCors,
  DEFAULT_ALLOWED_METHODS,
};
