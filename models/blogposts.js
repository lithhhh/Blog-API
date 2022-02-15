module.exports = (sequelize, DataTypes) => {
  const BlogPost = sequelize.define('BlogPost', {
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    userId: { type: DataTypes.INTEGER, foreignKey: true },
    published: DataTypes.DATE,
    updated: DataTypes.DATE,
  }, 
  {
    timestamps: false,
    modelName: 'BlogPosts',
  });

  BlogPost.findAllClean = () => BlogPost.findAll()
  .then((us) => us.map(({ dataValues }) => dataValues));

  return BlogPost;
};