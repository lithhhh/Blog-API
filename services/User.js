const { signToken } = require('../utils');
const { User } = require('../models');
require('dotenv').config();

const getAll = async () => User.findAllClean();

const getById = async (id) => {
  const user = await User.findByPk(id);
  if (!user) return { message: 'User does not exists', code: 404 };

  return { result: user, code: 200 };
};

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
  getById,
};