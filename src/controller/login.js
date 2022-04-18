const Login = require('express').Router();
const rescue = require('express-rescue');
const { login } = require('../services');

const validateLogin = require('./joi/loginSchema');

Login.post('/', rescue(async (req, res) => {
  validateLogin(req.body);

  const { code, token, message } = await login.login(req.body);

  if (message) return res.status(code).json({ message });

  return res.status(code).json({ token });
}));

module.exports = Login;