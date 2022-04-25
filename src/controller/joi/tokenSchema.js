const Joi = require('joi');

const notFound = 'Token not found';

const schema = Joi.object({
  authorization: Joi.string().min(1).empty().required()
  .messages({
    'any.required': notFound,
    'string.empty': notFound,
    'string.min': notFound,
    'any.string': notFound,
  }),
});

const validateToken = (body) => {
  const { error } = schema.validate(body);

  if (error) throw error;

  return true;
};

module.exports = validateToken;
