const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Order = require("../models/order.model")
const Product = require("../models/product.model")
const asyncHandler = require('express-async-handler');
const mongoose = require('mongoose')

// @desc    Fetch all orders
// @route   GET /api/orders
// @access  Public
const getOrders = asyncHandler(async (req, res) => {
    const orders = await Order.find()
    res.status(200).json(orders)
})

// @desc    Fetch all orders for a user
// @route   GET /api/my-orders
// @access  Public
const getMyOrders = asyncHandler(async (req, res) => {
    try {
        const orders = await Order.find({user: req.user.id}).lean()

        const newOrders = await Promise.all(orders.map(async (order) => {
            const productIds = order.products.map(product => product.id)
            const productsData = await Product.find({
                '_id': {
                    $in: productIds
                }
            }).select('_id image').lean();

            const newProductData = order.products.map((product) => {
                return {
                    ...product,
                    img: productsData.find(item => item._id.valueOf() === product.id.valueOf()).image
                }
            })
            order['products'] = newProductData;

            return order;
        }))

        return res.status(200).json(newOrders)
    } catch (err) {
        console.log(err)
        return res.status(500).json({
            message: err.message
        })
    }
})

// @desc    Fetch order by id
// @route   GET /api/orders/:id
// @access  Public
const getOrderById = asyncHandler(async (req, res) => {
    const orderId = req.params.id
    var order = await Order.findById(orderId).lean();
    if (order) {
        const productIds = order.products.map(product => product.id)
        const productsData = await Product.find({
            '_id': {
                $in: productIds
            }
        }).select('_id image').lean();

        const newProductData = order.products.map((product) => {
            return {
                ...product,
                img: productsData.find(item => item._id.valueOf() === product.id.valueOf()).image
            }
        })
        order['products'] = newProductData;

        res.json(order)
    } else {
        res.status(404)
        throw new Error("Order not found")
    }
})

// @desc    Make payment for order
// @route   POST /api/orders
// @access  Public
const payment = asyncHandler(async (req, res) => {
    let {amount} = req.body

    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount,
            currency: 'eur',
            payment_method_types: ['card'],
        })
        res.status(200).json({
            data: paymentIntent,
            success: true
        })
    } catch (error) {
        console.log("Error", error)
        res.status(500).json({
            message: "Payment failed",
            success: false
        })
    }
})

// @desc    Create a new order
// @route   POST /api/orders
// @access  Public
const createOrder = asyncHandler(async (req, res) => {
    const {products} = req.body
    let totalAmount = 0
    let orderProducts = []
    for (const product of products) {
        // TODO: if a product does not have a size, order creation for that size should fail..
        const id = product.product_id
        const model = await Product.findOne({_id: id})
        if (!model) {
            res.status(404)
            throw new Error("Product does not exist")
        }
        totalAmount += (model.price + model.delivery_charge) * product.quantity
        orderProducts.push({
            id: product.product_id,
            size: product.size,
            quantity: product.quantity,
            price: model.price,
            delivery_charge: model.delivery_charge
        })
    }
    try {
        const createdOrder = await Order.create({
            products: orderProducts,
            total_amount: totalAmount,
            user: req.user.id
        })
        return res.status(201).json({
            message: "Order created successfully",
            data: createdOrder
        })
    } catch (err) {
        console.log(err)
        res.status(500)
        throw new Error("Internal Server Error")
    }
})

// @desc    Update existing order
// @route   PUT /api/orders/:id
// @access  Public
const updateOrder = asyncHandler(async (req, res) => {
    const orderId = req.params.id
    const {products} = req.body
    const order = await Order.findById(orderId)
    if (!order) {
        res.status(400)
        throw new Error("Order not found!")
    }

    for (const product of products) {
        for (const item in order.products) {
            if (product.itemId === order.products[item]._id.valueOf()) {
                order.products[item].status = product.status ?? order.products[item].status
                order.products[item].size = product.size ?? order.products[item].size
                order.products[item].quantity = product.quantity ?? order.products[item].quantity

            }
        }
    }

    const updatedOrder = await order.save()
    res.status(200).json({
        message: "Order updated successfully",
        data: updatedOrder
    })
})

// @desc    Delete created order
// @route   DELETE /api/orders/:id
// @access  Public
const deleteOrder = asyncHandler(async (req, res) => {
    const orderId = req.params.id
    const order = Order.findById(orderId)
    if (!order) {
        res.status(400)
        throw new Error("Order not found!")
    }
    try {
        await Order.findByIdAndDelete(orderId)
        res.status(200).json({
            message: "Order deleted successfully!"
        })
    } catch (err) {
        console.log(err)
        res.status(500)
        throw new Error("Internal Server Error")
    }
})

module.exports = {getOrders, getMyOrders, getOrderById, payment, createOrder, updateOrder, deleteOrder}
