const Category = require('express').Router();
const rescue = require('express-rescue');
const { category } = require('../services');

const validateCategory = require('./joi/categoriesSchema');
const verifyAuth = require('./middlewares/validateToken');

Category.post('/', verifyAuth, rescue(async (req, res) => {
  validateCategory(req.body);

  const { code, result } = await category.create(req.body);

  return res.status(code).json(result);
}));

module.exports = Category;