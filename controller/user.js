const User = require('express').Router();
const rescue = require('express-rescue');
const verifyAuth = require('./middlewares/validateToken');

const { user } = require('../services');
const validateUser = require('./joi/userSchema');

User.get('/', verifyAuth, async (req, res) => {
  const users = await user.getAll();

  res.status(200).json(users);
});

User.post('/', rescue(async (req, res) => {
  validateUser(req.body);

  const { message, code, result } = await user.create(req.body);
  if (message) return res.status(code).json({ message });

  return res.status(201).json({ result });
}));

module.exports = User;