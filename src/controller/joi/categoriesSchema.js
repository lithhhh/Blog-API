const Joi = require('joi');

const schema = Joi.object({
  name: Joi.string().empty().required(),
});

const validateCateries = (body) => {
  const { error } = schema.validate(body);
  if (error) throw error;
  return true;
};

module.exports = validateCateries;
