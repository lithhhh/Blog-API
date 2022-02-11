const Joi = require('joi');

const schema = Joi.object({
  displayName: Joi.string().min(8).required(),
  email: Joi.string().email().required(),
  password: Joi.string().length(6).required(),
  image: Joi.string(),
});

const validateUser = (body) => {
  const { error } = schema.validate(body);
  if (error) throw error;
  return true;
};

module.exports = validateUser;
