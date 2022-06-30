const express = require('express');
const ProductController = require('../controllers/productsController');
const { validateName } = require('../middlewares/productValidation');

const productRouter = express.Router();

productRouter.get('/', ProductController.getAll);
productRouter.get('/:id', ProductController.findById);
productRouter.post('/', validateName, ProductController.create);

module.exports = productRouter;
