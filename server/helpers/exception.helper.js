const exceptionHandler = (res, error) => {
  return res.status(400).json({
    status: 400,
    error: error.details[0].message
  });
};

export default exceptionHandler;
