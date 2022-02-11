require('dotenv').config();

module.exports = {
  pass: process.env.JWT_SECRET, 
  expiresIn: '1h', 
  algorithm: 'HS256',
};
