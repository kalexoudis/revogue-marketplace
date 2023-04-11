const express = require("express");
const { getWishlist, addProductToWishlist, deleteProductInWishlist, clearWishlist } = require("../controllers/wishlist.controller");
const {protect} = require("../middleware/auth.middleware");

const router = express.Router();

router.route('/')
    .get(protect, getWishlist)
    .post(protect, addProductToWishlist)
    .delete(protect, clearWishlist);

router.route('/:id')
    .delete(protect, deleteProductInWishlist);

module.exports = router;