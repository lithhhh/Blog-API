const Joi = require('joi');

const schema = Joi.object({
  title: Joi.string().empty().required(),
  content: Joi.string().empty().required(),
  categoryIds: Joi.array().items(Joi.number()).min(1).required(),
});

const validateBlog = (body) => {
  const { error } = schema.validate(body);
  if (error) throw error;
  return true;
};

module.exports = validateBlog;
