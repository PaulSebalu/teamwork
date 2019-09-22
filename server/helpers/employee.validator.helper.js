import Joi from 'joi';

const signUpFields = employee => {
  const schema = {
    firstName: Joi.string()
      .regex(/^\S+$/)
      .min(3)
      .max(20)
      .required(),
    lastName: Joi.string()
      .regex(/^\S+$/)
      .min(3)
      .max(20)
      .required(),
    email: Joi.string()
      .regex(/^\S+$/)
      .email()
      .required(),
    password: Joi.string()
      .regex(/^\S+$/)
      .min(3)
      .max(255)
      .required(),
    gender: Joi.string()
      .regex(/^\S+$/)
      .min(1)
      .max(1)
      .required(),
    jobRole: Joi.string()
      .regex(/^\S+$/)
      .min(2)
      .max(15)
      .required(),
    department: Joi.string()
      .regex(/^\S+$/)
      .min(2)
      .max(25)
      .required(),
    address: Joi.string()
      .regex(/^\S+$/)
      .min(3)
      .max(255)
      .required()
  };

  const options = {
    language: {
      key: '{{key}} ',
      string: {
        regex: {
          base: 'must not have empty spaces'
        }
      }
    }
  };

  return Joi.validate(employee, schema, options);
};

export default signUpFields;
