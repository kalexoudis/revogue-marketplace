const mongoose = require("mongoose")
const {Schema} = require("mongoose");
const productColours = require("../constants/productColours")

const userSchema = mongoose.Schema(
    {
        // user data
        user_name: {
            type: String,
            required: [true, "Please add a name"],
            unique: true,
        },
        first_name: {
            type: String,
            required: [true, "Please add your firstname"],
        },
        last_name: {
            type: String,
            required: [true, "Please add your lastname"],
        },
        email: {
            type: String,
            required: [true, "Please add your email"],
            unique: true,
        },
        password: {
            type: String,
            required: [true, "Please add a password"],
        },
        is_seller: {
            type: Boolean,
            required: [true, "Please add a role"],
        },
        is_admin: {
            type: Boolean,
            default: false,
        },
        expected_delivery_time: {
            type: Number,
            default: null,
        },
        address: {
            type: String,
            default: null,
        },
        bank_information: {
            type: String,
            default: null,
        },
        telephone: {
            type: String,
            required: [false, "Please add a telephone number"]
        },
        // body measurements
        hip_height: {
            type: Number,
            default: null,
        },
        chest_circumference: {
            type: Number,
            default: null,
        },
        hip_size: {
            type: Number,
            default: null,
        },
        upper_body_height: {
            type: Number,
            default: null,
        },
        height: {
            type: Number,
            default: null,
        },
        // other features
        gender: {
            type: String,
            default: null,
        },
        age: {
            type: String,
            default: null,
        },
        favourite_colour: [{
            type: String,
            default: null,
        }],
        no_go_colour: [{
            type: String,
            default: null,
        }],
        // wishlist
        wishlist: [{
            type: Schema.Types.ObjectId,
            ref: 'Product',
            default: []
        }],
        points: {
            type: Number,
            default: 0
        },
        basket: {
            type: [{
                product_id: {
                    type: Schema.Types.ObjectId,
                    required: true,
                    ref: 'Product',
                },
                size: {
                    type: String,
                    required: true,
                },
                colour: {
                    type: String,
                    default: productColours.RED,
                    enum: [productColours.RED, productColours.GREEN, productColours.BLUE]
                },
                quantity: {
                    type: Number,
                    default: 1
                }
            }],
            default: []
        }
    },

    {
        timestamps: true,
    }
)

module.exports = mongoose.model("User", userSchema);
