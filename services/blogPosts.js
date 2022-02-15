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

const findAll = () => Category.findAllClean();

const findAllGet = async () => {
  const posts = await BlogPost.findAll({
    attributes: { exclude: ['UserId'] },
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
  });

  return posts.map((c) => c.dataValues);
};

module.exports = { create, findAll, findAllGet };