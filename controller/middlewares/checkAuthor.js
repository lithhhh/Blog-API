const rescue = require('express-rescue');
const { BlogPost } = require('../../services');
const { HTTP_UNAUTHORIZED: Unauthorized } = require('../../utils/http-codes');

const checkAuthor = rescue(async (req, res, next) => {
  const { id: idPost } = req.params;
  const { id } = req.userVerified;

  const { result } = await BlogPost.findById(idPost);

  if (!result) return res.status(404).json({ message: 'Post does not exist' });
  if (result.userId !== id) return res.status(Unauthorized).json({ message: 'Unauthorized user' });

  next();
});

module.exports = checkAuthor;