// eslint-disable-next-line consistent-return
const exceptionHandler = (validator, res, next) => {
  const { error } = validator;
  if (error) {
    return res.status(400).json({
      status: 400,
      error: error.details[0].message.replace(/"/g, '')
    });
  }
  next();
};

export default exceptionHandler;
