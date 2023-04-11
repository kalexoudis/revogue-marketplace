const express = require("express");
const {
    getOrders,
    getMyOrders,
    getOrderById,
    payment,
    createOrder,
    updateOrder,
    deleteOrder
} = require("../controllers/order.controller");
const {protect} = require('../middleware/auth.middleware');

const router = express.Router();

router.route('/')
    .get(protect, getOrders)
    .post(protect, createOrder);

router.route('/my-orders')
    .get(protect, getMyOrders)

router.route('/pay')
    .post(payment)

router.route('/:id')
    .get(protect, getOrderById)
    .put(protect, updateOrder)
    .delete(protect, deleteOrder);

module.exports = router;
