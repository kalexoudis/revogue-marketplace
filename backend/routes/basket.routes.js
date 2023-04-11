const express = require("express");
const {
    getBasket,
    addProductToBasket,
    deleteProductInBasket,
    clearBasket,
    updateItemInBasket
} = require("../controllers/basket.controller");
const {protect} = require("../middleware/auth.middleware");

const router = express.Router();

router.route('/')
    .get(protect, getBasket)
    .post(protect, addProductToBasket)
    .delete(protect, clearBasket);

router.route('/:id')
    .delete(protect, deleteProductInBasket)
    .put(protect, updateItemInBasket);

module.exports = router;