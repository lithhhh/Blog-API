const jwt = require('jsonwebtoken');
const { jwtConfig: { expiresIn, algorithm, pass } } = require('../utils');
const { User } = require('../models');
require('dotenv').config();

const login = async ({ email, _password }) => {
  const emailFound = await User.findOne({ where: { email } });
  if (!emailFound) return { code: 400, message: 'Invalid fields' };

  const jwtConfigs = {
    expiresIn,
    algorithm,
  };

  const token = jwt.sign({ email }, pass, jwtConfigs);
  return { code: 200, token };
};

module.exports = { login };