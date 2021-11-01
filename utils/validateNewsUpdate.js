const Joi = require("joi");

const validNewsUpdate = Joi.object({
  id: Joi.any(),
  title: Joi.string().required().trim().max(100),
  slug: Joi.string().required().trim(),
  shortDescription: Joi.string().required().trim(),
  photo: Joi.object(),
  content: Joi.any(),
  publishDate: Joi.date(),
  status: Joi.alternatives(["published", "draft"]),
});

export default function validate(data) {
  const { error } = validNewsUpdate.validate(data);

  if (!error) return;
  return error.details.map((error) => error.message);
}
