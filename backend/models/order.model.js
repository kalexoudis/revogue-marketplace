const {Schema, model} = require("mongoose")
const orderStatus = require("../constants/orderStatus")

const OrderSchema = Schema({
        products: [{
            id: {
                type: Schema.Types.ObjectId,
                required: true,
                ref: 'Product',
            },
            size: {
                type: String
            },
            status: {
                type: String,
                default: orderStatus.PENDING,
                enum: [orderStatus.PENDING, orderStatus.CREATED, orderStatus.SHIPPED, orderStatus.DELIVERED, orderStatus.ACCEPTED]
            },
            quantity: {
                type: Number,
                default: 1
            },
            price: {
                type: Number,
                required: true
            },
            delivery_charge: {
                type: Number,
                required: true
            }
        }],
        user: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
        total_amount: {
            type: Number,
            required: true,
        },
    },
    {
        timestamps: true
    })

module.exports = model("Order", OrderSchema)
