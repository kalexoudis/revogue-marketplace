const express = require("express");
const router = express.Router();
const {
    createProduct,
    getProducts,
    getMyProducts,
    getProductById,
    deleteProduct,
    updateProduct,
} = require('../controllers/product.controller');

const {protect} = require('../middleware/auth.middleware');

router.route('/')
    .get(getProducts)
    .post(protect, createProduct);

router.route("/myproducts")
    .get(protect, getMyProducts);

router.route('/:id')
    .get(getProductById)
    .delete(protect, deleteProduct)
    .put(protect, updateProduct);

module.exports = router;
