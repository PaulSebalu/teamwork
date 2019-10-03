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
      .required(),
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

export { signUpValidator, logInValidator };
