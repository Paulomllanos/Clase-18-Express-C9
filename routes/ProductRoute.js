const express = require('express');
const productRouter = express.Router();
const {allProducts, getProduct, createProduct, editProduct, deleteProduct} = require('../controllers/productController')

// endpoints

productRouter.route('/products')
    .get(allProducts)
    .post(createProduct)

productRouter.route('/product/:id')
    .get(getProduct)
    .put(editProduct)
    .delete(deleteProduct)

module.exports = productRouter;