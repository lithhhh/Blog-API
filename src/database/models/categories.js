module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
    name: DataTypes.STRING,
  }, {
    timestamps: false,
    tableName: 'Categories',
  });

  Category.findAllClean = () => Category.findAll()
  .then((us) => us.map(({ dataValues }) => dataValues));

  return Category;
};