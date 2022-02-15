const { Category } = require('../models');

const create = async ({ name }) => {
  const { dataValues } = await Category.create({ name });

  return { code: 201, result: dataValues };
};

module.exports = { create };