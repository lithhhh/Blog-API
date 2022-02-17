const BlogPosts = require('express').Router();
const rescue = require('express-rescue');
const { BlogPost } = require('../services');

const verifyAuth = require('./middlewares/validateToken');
const validateBlog = require('./joi/blogPostSchema');
const checkCategories = require('./middlewares/verifyCategories');

BlogPosts.post('/', verifyAuth, checkCategories, rescue(async (req, res) => {
  validateBlog(req.body);

  const { title, content } = req.body;
  const { id } = req.userVerified;

  const { result, code } = await BlogPost.create(title, content, id);

  return res.status(code).json(result);
}));

BlogPosts.get('/', verifyAuth, rescue(async (req, res) => {
  const { code, result } = await BlogPost.findAll();

  return res.status(code).json(result);
}));

BlogPosts.get('/:id', verifyAuth, rescue(async (req, res) => {
  const { id } = req.params;

  const { code, message, result } = await BlogPost.findById(id);

  if (message) return res.status(code).json({ message });

  return res.status(code).json(result);
}));

module.exports = BlogPosts;