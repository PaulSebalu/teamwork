const exceptionHandler = res => {
  return res.status(400).json({
    status: 400,
    error:
      'Please use a password that is atleast 8 characters long, contains at least one uppercase letter, contains at least one numeric character and has at least one lowercase letter'
  });
};

export default exceptionHandler;
