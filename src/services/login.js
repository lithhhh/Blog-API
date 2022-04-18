const { signToken } = require('../utils');
const { User } = require('../models');
require('dotenv').config();

const login = async ({ email, _password }) => {
  const emailFound = await User.findOne({ where: { email } });
  if (!emailFound) return { code: 400, message: 'Invalid fields' };

  const token = signToken({ email }, '6h');
  return { code: 200, token };
};

module.exports = { login };