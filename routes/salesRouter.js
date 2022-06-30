const express = require('express');

const salesRouter = express.Router();
const SalesController = require('../controllers/salesController');
const { validateProductId, validateQuantity } = require('../middlewares/salesValidations');

salesRouter.post('/', validateProductId, validateQuantity, SalesController.createSale);

module.exports = salesRouter;