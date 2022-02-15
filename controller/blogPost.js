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
  const data = await BlogPost.findAllGet();
  console.log(data);
  return res.status(200).json(data);
}));

module.exports = BlogPosts;