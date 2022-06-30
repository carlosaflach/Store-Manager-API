const validateName = (req, res, next) => {
  const { name } = req.body;

  if (name === undefined) {
    const error = {
      code: 'isRequired',
      message: '"name" is required',
    };
    return next(error);
  }

  if (name.length < 5) {
    const error = {
      code: 'greaterThan',
      message: '"name" length must be at least 5 characters long',
    };
    return next(error);
  }

  return next();
};

module.exports = {
  validateName,
};