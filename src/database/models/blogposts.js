const timestamp = {
  timestamps: false,
  modelName: 'BlogPosts',
};

module.exports = (sequelize, DataTypes) => {
  const BlogPost = sequelize.define('BlogPost', {
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    userId: { type: DataTypes.INTEGER, foreignKey: true },
    published: DataTypes.DATE,
    updated: DataTypes.DATE,
  }, timestamp);

  BlogPost.associate = (models) => {
    BlogPost.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'user',
    });
  };

  BlogPost.findAllClean = () => BlogPost.findAll()
  .then((us) => us.map(({ dataValues }) => dataValues));

  return BlogPost;
};