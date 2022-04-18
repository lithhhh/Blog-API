const joi = require('joi');
const { httpCodes } = require('../../utils');

module.exports = (e, req, res, next) => {
  if (!joi.isError(e)) return next(e);

  const { HTTP_UNAUTHORIZED, HTTP_BAD_REQUEST } = httpCodes;

  const [key] = e.details[0].path;
  const { message } = e.details[0];

  return res
    .status(key === 'authorization' ? HTTP_UNAUTHORIZED : HTTP_BAD_REQUEST)
    .json({ message });
};