const validateProductId = (req, res, next) => {
  const sales = req.body;
  sales.forEach((sale) => {
    if (!sale.productId) {
    const error = {
      code: 'isRequired',
      message: '"productId" is required',
    };
    return next(error);
  }
});
  return next();
};

const validateQuantity = (req, res, next) => {
  const sales = req.body;
  sales.forEach((sale) => {
    if (!sale.quantity && typeof sale.quantity !== 'number') {
    const error = {
      code: 'isRequired',
      message: '"quantity" is required',
    };
    return next(error);
  }

  if (sale.quantity <= 0) {
    const error = {
      code: 'greaterThan',
      message: '"quantity" must be greater than or equal to 1',
    };
    return next(error);
  }
  });
  
  return next();
};

module.exports = {
  validateProductId,
  validateQuantity,
};