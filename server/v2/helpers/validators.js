import Joi from 'joi';

const signUpValidator = employee => {
  const schema = {
    firstName: Joi.string()
      .min(2)
      .max(20)
      .required(),
    lastName: Joi.string()
      .min(2)
      .max(20)
      .required(),
    email: Joi.string()
      .email()
      .required(),
    password: Joi.string()
      .regex(/^((?=.*[a-z])(?=.*[A-Z]))(?=.*[0-9])(?=.{8,})/)
      .max(25)
      .required()
      .error(() => ({
        message:
          'Your password should be at least 8 characters, ' +
          'containing one uppercase letter, numeric ' +
          'character and lowercase letter.'
      })),
    gender: Joi.string()
      .regex(/[Mm, Ff]{1}$/)
      .min(1)
      .max(1),
    jobRole: Joi.string()
      .min(2)
      .max(35),
    department: Joi.string()
      .min(2)
      .max(35),
    address: Joi.string()
      .min(3)
      .max(35)
  };

  return Joi.validate(employee, schema);
};

const logInValidator = employee => {
  const schema = {
    email: Joi.string()
      .email()
      .required(),
    password: Joi.string()
      .min(3)
      .max(255)
      .required()
  };

  return Joi.validate(employee, schema);
};

const createArticleValidator = article => {
  const schema = {
    title: Joi.string()
      .min(3)
      .max(100)
      .required(),
    article: Joi.string()
      .min(3)
      .required(),
    category: Joi.string().min(3)
  };
  return Joi.validate(article, schema);
};

const updateArticleValidator = article => {
  const schema = {
    title: Joi.string()
      .min(3)
      .max(100),
    article: Joi.string().min(3),
    category: Joi.string().min(3)
  };
  return Joi.validate(article, schema);
};

const commentValidator = comment => {
  const schema = {
    comment: Joi.string()
      .min(3)
      .required()
  };
  return Joi.validate(comment, schema);
};

export {
  signUpValidator,
  logInValidator,
  createArticleValidator,
  updateArticleValidator,
  commentValidator
};
