/* eslint-disable consistent-return */
import Joi from 'joi';
import exceptionHandler from './exceptions';

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
      .regex(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/im)
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

  return exceptionHandler(Joi.validate(req.body, schema), res, next);
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

  return exceptionHandler(Joi.validate(req.body, schema), res, next);
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
  return exceptionHandler(Joi.validate(req.body, schema), res, next);
};

const updateArticleValidator = (req, res, next) => {
  const schema = {
    title: Joi.string()
      .min(3)
      .max(100),
    article: Joi.string().min(3),
    category: Joi.string().min(3)
  };
  return exceptionHandler(Joi.validate(req.body, schema), res, next);
};

const commentValidator = (req, res, next) => {
  const schema = {
    comment: Joi.string()
      .min(3)
      .required()
  };
  return exceptionHandler(Joi.validate(req.body, schema), res, next);
};

export {
  signUpValidator,
  logInValidator,
  createArticleValidator,
  updateArticleValidator,
  commentValidator
};
