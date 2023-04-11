const User = require("../models/user.model")
const Product = require("../models/product.model")
const asyncHandler = require('express-async-handler')
const Order = require("../models/order.model");


// @desc    Fetch all products in user's basket
// @route   GET /api/basket
// @access  Public
const getBasket = asyncHandler(async (req, res) => {
    try {
        const userModel = await User.findOne({_id: req.user.id});

        if (!userModel) {
            throw new Error("User not found")
        }
        const basket = userModel.basket

        if (basket.length === 0) {
            return res.status(200).json({
                message: "No items in the basket.",
                data: {
                    products: [],
                    brands: []
                },
            })
        }

        const updatedBasket = []
        let brandArray = [];

        for (const item of basket) {
            const ProductModel = await Product.findOne({_id: item.product_id})

            if(!brandArray.includes(ProductModel.brand)) {
                brandArray.push(ProductModel.brand)
            }

            const obj = {
                id: item._id,
                product_id: item.product_id,
                size: item.size,
                quantity: item.quantity,
                colour: item.colour,
                price: ProductModel.price,
                delivery_charge: ProductModel.delivery_charge,
                brand: ProductModel.brand,
                title: ProductModel.title,
                image: ProductModel.image
            }
            updatedBasket.push(obj)
        }

        //Query for brand delivery
        const brandWithDelivery = await User.find({
            $and:[{
                "user_name": {
                    $in: brandArray
                }
            },  {
                "is_seller": true
            }]
        }).select('user_name expected_delivery_time')

        const updatedBrands = brandWithDelivery?.map(item => {
            var date = new Date();
            return {
                brand: item.user_name,
                expected_delivery_time: new Date(date.setDate(date.getDate() + parseInt(item.expected_delivery_time))).toISOString().slice(0, 10)
             }
        })

        //New products list with delivery time
        const returnedBasket = {
            products: updatedBasket,
            brands: updatedBrands
        }

        return res.status(200).json({
            message: 'Basket fetched successfully',
            success: true,
            data: returnedBasket
        })
    } catch (err) {
        console.log(err)
        return res.status(500).json({
            message: err.message,
            success: false
        })
    }
})


// @desc    Add product to basket
// @route   POST /api/basket
// @access  Public
const addProductToBasket = asyncHandler(async (req, res) => {
    try {
        const {product_id, quantity, size, colour} = req.body
        const product = await Product.findOne({_id: product_id})

        if (!product) {
            res.status(404)
            throw new Error("Product does not exist")
        }

        const userModel = await User.findOne({_id: req.user._id})

        if (!userModel) {
            throw new Error("User not found")
        }

        const itemsInBasket = userModel.basket

        // If the product with same size and color already exists then increment the quantity
        const existedItem = itemsInBasket.filter(item =>
            item.product_id.valueOf() === product_id &&
            item.size === size &&
            item.colour === colour
        );

        if (existedItem.length > 0) {
            const updatedBasket = itemsInBasket.map(item => {
                if (item.product_id.valueOf() === product_id &&
                    item.size === size &&
                    item.colour === colour) {
                    item.quantity = parseInt(item.quantity) + parseInt(quantity)
                }
                return item;
            })
            await userModel.update({$set: {basket: updatedBasket}})
        } else {
            const newItemInBasket = {
                product_id: product_id,
                size: size,
                quantity: quantity,
                colour: colour,
                price: product.price,
                delivery_charge: product.delivery_charge
            }
            await userModel.update({$push: {basket: newItemInBasket}})
        }
        res.status(200).json({
            message: "Product added to basket successfully",
            success: true
        })
    } catch (err) {
        return res.status(500).json({
            message: err.message,
            success: false
        })
    }
})


// @desc    Delete product from basket
// @route   DELETE /api/basket/:id
// @access  Public
const deleteProductInBasket = asyncHandler(async (req, res) => {
    try {
        const product_object_id = req.params.id

        const userModel = await User.findOne({_id: req.user._id})

        if (!userModel) {
            throw new Error("User not found")
        }

        const itemsInBasket = userModel.basket

        const requiredItem = itemsInBasket.filter((item) => {
            return item._id.valueOf() === product_object_id
        })

        if (requiredItem.length === 0) {
            throw new Error("Product does not exist in the basket")
        }

        await userModel.update({"$pull": {"basket": {"_id": product_object_id}}})
        const updatedModel = await User.findOne({_id: req.user._id})

        res.status(200).json({
            message: "Product deleted from basket successfully",
            success: true,
            data: updatedModel
        })
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message
        })
    }
})


// @desc    Clear basket
// @route   DELETE /api/basket
// @access  Public
const clearBasket = asyncHandler(async (req, res) => {
    try {
        const userModel = await User.findOne({_id: req.user._id})

        if (!userModel) {
            throw new Error("User not found")
        }

        await userModel.update({$unset: {basket: ""}})
        res.status(204).json({
            message: "Basket cleared successfully",
            data: []
        })
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message
        })
    }
})


// @desc    Update item in basket
// @route   PUT /api/basket/:id
// @access  Public
const updateItemInBasket = asyncHandler(async (req, res) => {
    try {
        const product_object_id = req.params.id
        const {quantity} = req.body

        const userModel = await User.findOne({_id: req.user._id})

        if (!userModel) {
            throw new Error("User not found")
        }

        const itemsInBasket = userModel.basket

        //Loop inside the basket and update the quantity of give item
        const updatedBasket = itemsInBasket.map((item) => {
            if (item._id.valueOf() === product_object_id) {
                item.quantity = quantity
            }
            return item;
        })

        await userModel.update({$set: {basket: updatedBasket}})

        res.status(200).json({
            message: "Basket updated successfully",
            success: true
        })
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message
        })
    }
})


module.exports = {getBasket, addProductToBasket, deleteProductInBasket, clearBasket, updateItemInBasket}