const asyncHandler = require("express-async-handler");
const Product = require("../models/product.model");
const User = require("../models/user.model")
const {isValidObjectId} = require('mongoose')

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
const getProducts = asyncHandler(async (req, res) => {
    try {
        const pageSize = 100
        const page = Number(req.query.pageNumber) || 1

        const keyword = req.query.keyword
            ? {
                title: {
                    $regex: req.query.keyword,
                    $options: 'i',
                },
            }
            : {}

        const count = await Product.countDocuments({...keyword})
        const products = await Product.find({...keyword})
            .limit(pageSize)
            .skip(pageSize * (page - 1))
            .lean()

        //Get unique brand array
        var brandArray = [];
        products.forEach((product)=>{
            if(!brandArray.includes(product.brand)) {
                brandArray.push(product.brand)
            }
        })
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

        //New products list with delivery time
        const newProducts = products.map((product) => {
            product['expected_delivery_time'] = brandWithDelivery
                    .find(item => item.user_name === product.brand)
                ?.expected_delivery_time

            return product
        })
        return res.json({products: newProducts, page, pages: Math.ceil(count / pageSize)})
    } catch (err) {
        console.log(err)
        return res.status(500).json({
            message: 'Something went wrong'
        })
    }
});

// @desc    Fetch sellers products
// @route   Get /api/products/:id
// @access  Public
const getMyProducts = asyncHandler(async (req, res) => {
    const products = await Product.find({user: req.user._id})
    res.json(products)
})

// @desc    Fetch single product
// @route   Get /api/products/:id
// @access  Public
const getProductById = asyncHandler(async (req, res) => {
    const productId = req.params.id;

    if(isValidObjectId(productId)) {
        let product = await Product.findById(req.params.id).lean()

        if (product) {
            //Query for brand delivery
            const brandWithDelivery = await User.find({
                $and:[{
                    "user_name": {
                        $in: product.brand
                    }
                },  {
                    "is_seller": true
                }]
            }).select('user_name expected_delivery_time')

            //Add the expected delivery_time
            product['expected_delivery_time'] = brandWithDelivery[0].expected_delivery_time

            return res.json(product)
        }
    }
    res.status(404)
    throw new Error("Product not found")

});

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Seller
const deleteProduct = asyncHandler(async (req, res) => {
    const product = await Product.findByIdAndDelete(req.params.id)

    if (product) {
        await product.remove();
        res.json({message: "Product deleted successfully"})
    } else {
        res.status(404)
        throw new Error("Product not found")
    }

});


// @desc    Create a product
// @route   POST /api/products
// @access  Private/Seller
const createProduct = asyncHandler(async (req, res) => {
    if (Object.keys(req.body).length === 0) {
        res.status(400)
        throw new Error("Request body is empty")
    }

    try {
        const product = await Product.create(req.body);
        product.user = req.user._id;
        product.save();
        return res.status(201).json(product);
    } catch (err) {
        console.log(err)
        res.status(500)
        throw new Error("Internal server error")
    }

});


// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Seller
const updateProduct = asyncHandler(async (req, res) => {
    if (Object.keys(req.body).length === 0) {
        res.status(400)
        throw new Error("Request body is empty")
    }

    try {
        let product = await Product.findByIdAndUpdate(req.params.id, req.body, {new: true})
        return res.status(200).json(product);
    } catch (err) {
        return res.status(500)
        throw new Error("Internal server error")
    }

});

module.exports = {
    getProducts,
    getMyProducts,
    getProductById,
    deleteProduct,
    createProduct,
    updateProduct,
}
