import Joi from 'joi';

const commentValidator = comment => {
  const schema = {
    comment: Joi.string()
      .min(3)
      .required()
  };
  return Joi.validate(comment, schema);
};

export default commentValidator;
