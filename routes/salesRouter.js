const express = require('express');

const salesRouter = express.Router();
const SalesController = require('../controllers/salesController');
const { validateProductId, validateQuantity } = require('../middlewares/salesValidations');

salesRouter.post('/', validateProductId, validateQuantity, SalesController.createSale);
salesRouter.get('/', SalesController.getAll);
salesRouter.get('/:id', SalesController.findById);
salesRouter.delete('/:id', SalesController.deleteSale);

module.exports = salesRouter;