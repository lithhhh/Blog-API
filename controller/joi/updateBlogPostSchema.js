const Joi = require('joi');

const schema = Joi.object({
  title: Joi.string().empty().required(),
  content: Joi.string().empty().required(),
  categoryIds: Joi.any().forbidden().messages({
    'any.unknown': 'Categories cannot be edited',
  }),
});

const validateUpdate = (body) => {
  const { error } = schema.validate(body);
  if (error) throw error;
  return true;
};

module.exports = validateUpdate;
