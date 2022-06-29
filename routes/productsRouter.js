const express = require('express');
const ProductController = require('../controllers/productsController');

const productRouter = express.Router();

productRouter.get('/', ProductController.getAll);
productRouter.get('/:id', ProductController.findById);

module.exports = productRouter;
