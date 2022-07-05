const express = require('express');
const ProductController = require('../controllers/productsController');
const { validateName } = require('../middlewares/productValidation');

const productRouter = express.Router();

productRouter.get('/', ProductController.getAll);
productRouter.get('/:id', ProductController.findById);
productRouter.post('/', validateName, ProductController.create);
productRouter.put('/:id', validateName, ProductController.update);
productRouter.delete('/:id', ProductController.deleteProduct);

module.exports = productRouter;
