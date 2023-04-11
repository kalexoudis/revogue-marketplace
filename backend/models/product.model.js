const mongoose = require("mongoose")

const productSchema = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
        brand: {
            type: String,
            required: true,
        },
        title: {
            type: String,
            required: true,
        },
        size: {
            type: String,
            required: true,
        },
        available_sizes: [{
            type: String
        }],
        gender: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        delivery_charge: {
            type: Number,
            default: 0
        },
        occasion: {
            type: String,
            required: true,
        },
        type_of_clothes: {
            type: String,
            required: true,
        },
        colour: {
            type: String,
            required: true,
        },
        image: {
            type: String,
            required: true,
        },
        xs: {
            height: {type: Number, default: 0},
            hip_height: {type: Number, default: 0},
            chest_circumference: {type: Number, default: 0},
            hip_size: {type: Number, default: 0},
            upper_body_height: {type: Number, default: 0},
        },
        s: {
            height: {type: Number, default: 0},
            hip_height: {type: Number, default: 0},
            chest_circumference: {type: Number, default: 0},
            hip_size: {type: Number, default: 0},
            upper_body_height: {type: Number, default: 0},
        },
        m: {
            height: {type: Number, default: 0},
            hip_height: {type: Number, default: 0},
            chest_circumference: {type: Number, default: 0},
            hip_size: {type: Number, default: 0},
            upper_body_height: {type: Number, default: 0},
        },
        l: {
            height: {type: Number, default: 0},
            hip_height: {type: Number, default: 0},
            chest_circumference: {type: Number, default: 0},
            hip_size: {type: Number, default: 0},
            upper_body_height: {type: Number, default: 0},
        },
        xl: {
            height: {type: Number, default: 0},
            hip_height: {type: Number, default: 0},
            chest_circumference: {type: Number, default: 0},
            hip_size: {type: Number, default: 0},
            upper_body_height: {type: Number, default: 0},
        },
        xxl: {
            height: {type: Number, default: 0},
            hip_height: {type: Number, default: 0},
            chest_circumference: {type: Number, default: 0},
            hip_size: {type: Number, default: 0},
            upper_body_height: {type: Number, default: 0},
        },
    },
    {
        timestamps: true,
    }
)

module.exports = mongoose.model("Product", productSchema);
