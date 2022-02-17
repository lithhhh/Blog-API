const User = require('express').Router();
const rescue = require('express-rescue');
const verifyAuth = require('./middlewares/validateToken');

const { user } = require('../services');
const validateUser = require('./joi/userSchema');

User.get('/', verifyAuth, async (req, res) => {
  const users = await user.getAll();

  res.status(200).json(users);
});

User.get('/:id', verifyAuth, async (req, res) => {
  const { id } = req.params;
  const { result, code, message } = await user.getById(id);
  if (message) return res.status(code).json({ message });

  res.status(code).json(result);
});

User.post('/', rescue(async (req, res) => {
  validateUser(req.body);

  const { message, code, result } = await user.create(req.body);
  if (message) return res.status(code).json({ message });

  return res.status(201).json({ result });
}));

User.delete('/:id', verifyAuth, rescue(async (req, res) => {
  const { id } = req.params;
  await user.deleteUser(id);

  return res.status(204).json();
}));

module.exports = User;