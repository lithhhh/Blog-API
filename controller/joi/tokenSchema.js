const Joi = require('joi');

const schema = Joi.object({
  authorization: Joi.string().min(1).required()
  .messages({
    'any.required': 'Expired or invalid token',
    'string.min': 'Expired or invalid token',
  }),
});

const validateToken = (body) => {
  const { error } = schema.validate(body);

  if (error) throw error;

  return true;
};

module.exports = validateToken;
