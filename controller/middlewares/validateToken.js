const rescue = require('express-rescue');
const { verifyToken } = require('../../utils');
const validateToken = require('../joi/tokenSchema');
const { User } = require('../../models');
const { HTTP_UNAUTHORIZED } = require('../../utils/http-codes');

module.exports = rescue(async (req, res, next) => {
  const { authorization } = req.headers;

  validateToken({ authorization });

  try {
    const verify = verifyToken(authorization);

    req.userVerified = verify;
    const { id } = await User.findOneClean('email', verify.email);

    req.userVerified.id = id;

    next();
  } catch (e) {
    console.error(e);
    return res.status(HTTP_UNAUTHORIZED).json({ message: 'Token not found' });
  }
});
