const { Category } = require('../database/models');

const create = async ({ name }) => {
  const { dataValues } = await Category.create({ name });

  return { code: 201, result: dataValues };
};

const getAll = async () => Category.findAllClean();

module.exports = { create, getAll };