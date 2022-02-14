const { signToken } = require('../utils');
const { User } = require('../models');
require('dotenv').config();

const getAll = async () => User.findAllClean();

const findByEmail = async (email) => User.findByEmail(email);

const create = async ({ displayName, email, password, image }) => {
  const emailFound = await User.findOne({ where: { email } });

  if (emailFound) return { code: 409, message: 'User already registered' };

  User.create({ displayName, email, password, image });
  const token = signToken({ displayName }, '6h');

  return { code: 201, result: token };
};

module.exports = {
  getAll,
  findByEmail,
  create,
};