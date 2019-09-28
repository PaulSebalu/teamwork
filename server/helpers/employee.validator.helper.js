import Joi from 'joi';

const signUpValidator = employee => {
  const schema = {
    firstName: Joi.string()
      .min(3)
      .max(20)
      .required(),
    lastName: Joi.string()
      .min(3)
      .max(20)
      .required(),
    email: Joi.string()
      .email()
      .required(),
    password: Joi.string()
      .min(4)
      .max(25)
      .required(),
    gender: Joi.string()
      .min(1)
      .max(10)
      .required(),
    jobRole: Joi.string()
      .min(2)
      .max(35)
      .required(),
    department: Joi.string()
      .min(2)
      .max(35)
      .required(),
    address: Joi.string()
      .min(3)
      .max(35)
      .required()
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
