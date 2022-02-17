const { BlogPost, Category, User } = require('../models');

const create = async (title, content, userId) => {
  const { dataValues } = await BlogPost.create({ title, content, userId });
  
  return { code: 201,
          result: { 
          id: dataValues.id,
          title: dataValues.title, 
          content: dataValues.content, 
          userId }, 
        };
};

const findAll = async () => {
  const posts = await BlogPost.findAll({
    attributes: { exclude: ['UserId'] },
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
  });

  return { code: 200, result: posts.map(({ dataValues }) => dataValues) };
};

 const findById = async (id) => {
  const post = await BlogPost.findOne({
    where: { id },
    attributes: { exclude: ['UserId'] },
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
  });
  
  if (!post) return { code: 404, message: 'Post does not exist' };

  return { code: 200, result: post.dataValues };
};

module.exports = { create, findAll, findById };