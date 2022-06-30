const express = require('express');

const salesRouter = express.Router();
const SalesController = require('../controllers/salesController');

salesRouter.post('/', SalesController.createSale);

module.exports = salesRouter;