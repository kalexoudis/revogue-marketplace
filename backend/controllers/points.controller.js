const User = require("../models/user.model")
const Product = require("../models/product.model")
const Order = require("../models/order.model")
const asyncHandler = require('express-async-handler')


// @desc    Get the collected points for a user
// @route   GET /api/points
// @access  Public
const getPoints = asyncHandler(async (req, res) => {
    const userModel = await User.findOne({_id: req.user.id})

    if (!userModel) {
        res.status(404)
        throw new Error("User not found")
    }
    const points = userModel.points

    res.status(200).json({
        success: true,
        message: "Points fetched successfully",
        data: points
    })
})


// @desc    Add points for each accepted order
// @route   PUT /api/points
// @access  Public
const addPoints = asyncHandler(async (req, res) => {
    const { order_id, product_id } = req.body
    const orderModel = await Order.findOne({_id: order_id})
    const productModel = await Product.findOne({_id: product_id})
    const userModel = await User.findOne({_id: req.user.id})

    if (!userModel) {
        throw new Error("User not found")
    }

    if (!orderModel) {
        throw new Error(`Order not found`)
    }

    let productFoundInOrder = false
    let isDelivered = false
    let quantity
    // Check if product exists in the order
    for (const product of orderModel.products) {
        if (product.id.valueOf() === product_id) {
            productFoundInOrder = true
            quantity = product.quantity
            if (product.status === "delivered" || product.status === "accepted") {
                isDelivered = true
            }
            break;
        }
    }

    if (!productModel || !productFoundInOrder) {
        res.status(404)
        throw new Error(`Product not found`)
    }

    if (!isDelivered) {
        res.status(400)
        throw new Error("Cannot add points for not delivered orders")
    }

    const existingPoints = userModel.points
    // We don't add points based on the quantity of product, because it could be that out of 2 same products,
    // user returns 1 of them because it is damaged or the size is wrong. So, for each product, add points should
    // be called if the user decides to accept the product.
    const updatedPoints = existingPoints + productModel.price*quantity

    await userModel.update({$set: {points: updatedPoints}})
    const updatedModel = await User.findOne({_id: req.user.id})
    res.status(200).json({
        success: true,
        message: "Points added successfully",
        data: updatedModel
    })
})


// @desc    Deduct used points
// @route   PUT /api/points/use-points
// @access  Public
const deductPoints = asyncHandler(async (req, res) => {
    const { points } = req.body

    const userModel = await User.findOne({_id: req.user.id})

    if (!userModel) {
        res.status(404)
        throw new Error("User not found")
    }

    const existingPoints = userModel.points

    if (points > existingPoints) {
        res.status(400)
        throw new Error("Cannot use more than existing points")
    }
    const updatedPoints = existingPoints - points

    await userModel.update({$set: {points: updatedPoints}})
    const updatedModel = await User.findOne({_id: req.user.id})
    res.status(200).json({
        success: true,
        message: "Points deducted successfully",
        data: updatedModel
    })
})

module.exports = {getPoints, addPoints, deductPoints}