import Joi from 'joi';

const updateArticleValidator = article => {
  const schema = {
    title: Joi.string()
      .min(3)
      .max(100),
    article: Joi.string()
      .min(3)
  };
  return Joi.validate(article, schema);
};

export default updateArticleValidator;
