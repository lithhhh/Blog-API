const Joi = require('joi');

const schema = Joi.object({
  authorization: Joi.string().min(1).empty().required()
  .messages({
    'any.required': 'Token not found',
    'string.empty': 'Token not found',
    'string.min': 'Token not found',
  }),
});

const validateToken = (body) => {
  const { error } = schema.validate(body);

  if (error) throw error;

  return true;
};

module.exports = validateToken;
