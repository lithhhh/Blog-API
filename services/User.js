const jwt = require('jsonwebtoken');
const { jwtConfig: { expiresIn, algorithm, pass } } = require('../utils');
const { User } = require('../models');
require('dotenv').config();

const getAll = async () => User.findAllClean();

const findByEmail = async (email) => User.findByEmail(email);

const create = async ({ displayName, email, password, image }) => {
  const emailFound = await User.findOne({ where: { email } });
  const jwtConfigs = {
    expiresIn,
    algorithm,
  };

  if (emailFound) return { code: 409, message: 'User already registered' };

  User.create({ displayName, email, password, image });
  const token = jwt.sign({ displayName }, pass, jwtConfigs);
  console.log(token);

  return { code: 201, result: token };
};

module.exports = {
  getAll,
  findByEmail,
  create,
};