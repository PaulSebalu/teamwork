const exceptionHandler = (res, error) => {
  return res.status(422).json({
    status: 422,
    error: error.details[0].message
  });
};

export default exceptionHandler;
