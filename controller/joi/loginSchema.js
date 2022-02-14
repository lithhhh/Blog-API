const Joi = require('joi');

const schema = Joi.object({
  email: Joi.string().email().empty().required(),
  password: Joi.string().length(6).empty().required(),
});

const validateLogin = (body) => {
  const { error } = schema.validate(body);
  if (error) throw error;
  return true;
};

module.exports = validateLogin;
