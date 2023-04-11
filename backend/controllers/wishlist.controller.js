const User = require("../models/user.model")
const Product = require("../models/product.model")
const asyncHandler = require('express-async-handler')

// @desc    Fetch all products in wishlist
// @route   GET /api/wishlist
// @access  Public
const getWishlist = asyncHandler(async (req, res) => {
    const userModel = await User.findOne({_id: req.user._id})

    if (!userModel) {
        throw new Error("User not found")
    }

    const wishlist = userModel.wishlist
    const products = []
    for (const productId of wishlist) {
        const product = await Product.findOne({_id: productId})
        products.push(product)
    }
    res.status(200).json({
        success: true,
        message: "Wishlist fetched successfully",
        data: products
    })
})

// @desc    Add product to wishlist
// @route   POST /api/wishlist
// @access  Public
const addProductToWishlist = asyncHandler(async (req, res) => {
    const {product_id} = req.body
    const model = await Product.findOne({_id: product_id})

    if (!model) {
        throw new Error(`Product not found`)
    }

    const userModel = await User.findOne({_id: req.user._id})

    if (!userModel) {
        throw new Error("User not found")
    }

    if (userModel.wishlist.includes(product_id)) {
        throw new Error("Product already exists in the wishlist")
    }

    await userModel.update({$push: {wishlist: product_id}})
    const updatedModel = await User.findOne({_id: req.user._id})
    res.status(200).json({
        success: true,
        message: "Product added to wishlist successfully",
        data: updatedModel.wishlist
    })
})

// @desc    Delete product in wishlist
// @route   DELETE /api/wishlist/:id
// @access  Public
const deleteProductInWishlist = asyncHandler(async (req, res) => {
    const product_id = req.params.id

    const userModel = await User.findOne({_id: req.user._id})

    if (!userModel) {
        throw new Error("User not found")
    }

    if (!userModel.wishlist.includes(product_id)) {
        throw new Error("Product does not exist in the wishlist")
    }

    await userModel.update({$pull: {wishlist: product_id}})
    const updatedModel = await User.findOne({_id: req.user._id})
    res.status(200).json({
        success: true,
        message: "Product deleted from wishlist successfully",
        data: updatedModel.wishlist
    })
})

// @desc    Clear wishlist
// @route   DELETE /api/wishlist
// @access  Public
const clearWishlist = asyncHandler(async (req, res) => {
    const userModel = await User.findOne({_id: req.user._id})

    if (!userModel) {
        throw new Error("User not found")
    }

    await userModel.update({$unset: {wishlist: ""}})
    const updatedModel = await User.findOne({_id: req.user._id})
    res.status(200).json({
        success: true,
        message: "Wishlist cleared successfully",
        data: updatedModel
    })
})


module.exports = {getWishlist, addProductToWishlist, deleteProductInWishlist, clearWishlist}