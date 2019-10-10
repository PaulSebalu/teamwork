/* eslint-disable consistent-return */
import Joi from 'joi';
import exceptionHandler from '../helpers/exceptions';

const signUpValidator = (req, res, next) => {
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

  const { error } = Joi.validate(req.body, schema);
  if (error) {
    return exceptionHandler(res, error);
  }
  next();
};

const logInValidator = (req, res, next) => {
  const schema = {
    email: Joi.string()
      .email()
      .required(),
    password: Joi.string()
      .min(3)
      .max(255)
      .required()
  };

  const { error } = Joi.validate(req.body, schema);
  if (error) {
    return exceptionHandler(res, error);
  }
  next();
};

const createArticleValidator = (req, res, next) => {
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
  const { error } = Joi.validate(req.body, schema);
  if (error) {
    return exceptionHandler(res, error);
  }
  next();
};

const updateArticleValidator = (req, res, next) => {
  const schema = {
    title: Joi.string()
      .min(3)
      .max(100),
    article: Joi.string().min(3),
    category: Joi.string().min(3)
  };
  const { error } = Joi.validate(req.body, schema);
  if (error) {
    return exceptionHandler(res, error);
  }
  next();
};

const commentValidator = (req, res, next) => {
  const schema = {
    comment: Joi.string()
      .min(3)
      .required()
  };
  const { error } = Joi.validate(req.body, schema);
  if (error) {
    return exceptionHandler(res, error);
  }
  next();
};

export {
  signUpValidator,
  logInValidator,
  createArticleValidator,
  updateArticleValidator,
  commentValidator
};