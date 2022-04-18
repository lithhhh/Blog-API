const timestamp = {
  timestamps: false,
  tableName: 'Users',
};

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    displayName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    image: DataTypes.STRING,
  }, timestamp);

  User.associate = (models) => {
    User.hasMany(models.BlogPost, {
      foreignKey: 'userId',
      as: 'posts',
    });
  };
  User.findAllClean = () => User.findAll().then((us) => us.map(({ dataValues }) => dataValues));
  User.findOneClean = (column, item) => User.findOne({ where: { [column]: item } })
    .then(({ dataValues }) => dataValues);

  return User;
};