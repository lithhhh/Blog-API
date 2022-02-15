const rescue = require('express-rescue');
const { BlogPost } = require('../../services');

const checkCategories = rescue(async (req, res, next) => {
  const { categoryIds } = req.body;

  if (!categoryIds) {
    return res
      .status(400)
      .json({ message: '"categoryIds" is required' });
  }

  const categories = await BlogPost.findAll();
  const arrCategories = categories.map(({ id }) => id);

  const check = categoryIds.every((cat) => arrCategories.includes(cat));
  console.log(check);

  if (!check) {
    return res
      .status(400)
      .json({ message: '"categoryIds" not found' });
  }

  next();
});

module.exports = checkCategories;