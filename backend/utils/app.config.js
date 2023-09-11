require('dotenv').config();

const SECRET = process.env.NODE_ENV === 'production' ? process.env.SECRET_KEY : 'dev-secret';

module.exports = {
  SECRET,
};
