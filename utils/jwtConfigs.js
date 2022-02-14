const jwt = require('jsonwebtoken');
require('dotenv').config();

const { JWT_SECRET } = process.env;

const jwtConfigs = (duration) => ({ algorithm: 'HS256', expiresIn: duration });

const signToken = (payload, expiresIn) => jwt.sign(payload, JWT_SECRET, jwtConfigs(expiresIn));
const verifyToken = (token) => jwt.verify(token, JWT_SECRET, { algorithms: ['HS256'] });

module.exports = {
  signToken,
  verifyToken,
};
