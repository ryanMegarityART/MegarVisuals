const Joi = require("joi");

export const schema = Joi.object({
  resourceType: Joi.string().required(),
  type: Joi.string().required(),
  entry: Joi.array().required(),
});
