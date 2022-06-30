const express = require('express');
const ProductController = require('../controllers/productsController');

const productRouter = express.Router();

productRouter.get('/', ProductController.getAll);
productRouter.get('/:id', ProductController.findById);
productRouter.post('/', ProductController.create);

module.exports = productRouter;
