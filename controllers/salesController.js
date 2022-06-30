const SalesService = require('../services/salesService');

const createSale = async (req, res, _next) => {
  const newSale = await SalesService.createSale(req.body);

  return res.status(201).json(newSale);
};

module.exports = { 
  createSale,
};