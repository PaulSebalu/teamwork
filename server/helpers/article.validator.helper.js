import Joi from 'joi';

const articleValidator = article => {
  const schema = {
    title: Joi.string()
      .min(3)
      .max(100)
      .required(),
    article: Joi.string()
      .min(3)
      .required()
  };
  return Joi.validate(article, schema);
};

export default articleValidator;
