const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler');
const User = require('../models/user.model');


// @desc    Fetch all users
// @route   GET /api/users
// @access  Public
const getUsers = asyncHandler(async (req, res) => {
    const page_size = 5000
    const page = Number(req.query.pageNumber) || 1

    const keyword = req.query.keyword
        ? {
            name: {
                $regex: req.query.keyword,
                $options: 'i',
            },
        }
        : {}

    const count = await User.countDocuments({...keyword})
    const users = await User.find({...keyword})
        .limit(page_size)
        .skip(page_size * (page - 1))

    res.json({users, page, pages: Math.ceil(count / page_size)})
});

// @desc    Fetch single user
// @route   GET /api/users/:id
// @access  Public
const getUserById = asyncHandler(async (req, res) => {
    const user = await
        User.findById(req.params.id)
    if (user) {
        res.json(user)
    } else {
        res.status(404)
        throw new Error("User not found")
    }
});

// @desc    Delete a user
// @route   DELETE /api/users/:id
// @access  Public
const deleteUser = asyncHandler(async (req, res) => {
    const user = await User.findByIdAndDelete(req.params.id)

    if (user) {
        await user.remove();
        res.json({message: "User deleted successfully"})
    } else {
        res.status(404)
        throw new Error("User not found")
    }
});

// @desc    Create a user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {

    if (Object.keys(req.body).length === 0) {
        res.status(400)
        throw new Error("Request body is empty")
    }
    const {
        user_name,
        first_name,
        last_name,
        email,
        password,
        is_seller,
        address,
        bank_information,
        telephone,
        expected_delivery_time
    } = req.body

    if (!user_name || !first_name || !last_name || !email || !password || !telephone || is_seller === undefined) {
        res.status(400)
        throw new Error('Please add all fields')
    }

    // Check if user exists
    const userExists = await User.findOne({email})

    if (userExists) {
        res.status(400)
        throw new Error('User already exists')
    }
    // Hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)
    const user = await User.create(
        {
            user_name,
            first_name,
            last_name,
            email,
            is_seller,
            telephone,
            address,
            bank_information,
            expected_delivery_time,
            password: hashedPassword,
        }
    );

    if (user) {
        return res.status(201).json({
            _id: user.id,
            is_seller: user.is_seller,
            is_admin: user.is_admin,
            name: user.user_name,
            token: generateToken(user._id),
        })
    } else {
        res.status(400)
        throw new Error('Invalid user data')
    }
});

// @desc    Update body Measurements
// @route   PUT /api/users/body_measurements/:id (protected)
// @route   PUT /api/users/dev/body_measurements/:id (dev unprotected)
// @access  Public
const updateBodyMeasurements = asyncHandler(async (req, res) => {
    if (Object.keys(req.body).length === 0) {
        res.status(400)
        throw new Error("Request body is empty")
    }

    const user = await User.findOne({_id: req.user._id})

    // Check if user exists
    if (!user) {
        throw new NotFoundError();
    }

    const {hip_height, chest_circumference, hip_size, upper_body_height, height} = req.body

    if (!hip_height || !chest_circumference || !hip_size || !upper_body_height || !height) {
        res.status(400)
        throw new Error('Please add all fields')
    }

    try {
        // Update the user
        user.set({
            hip_height: hip_height,
            chest_circumference: chest_circumference,
            hip_size: hip_size,
            upper_body_height: upper_body_height,
            height: height
        });
        await user.save();

        return res.status(201).json(user)

    } catch (err) {
        res.status(500)
        throw new Error("Internal server error")
    }

});


// @desc    Update otherFeatures
// @route   PUT /api/users/other_features/:id (protected)
// @route   PUT /api/users/dev/other_features/:id (dev unprotected)
// @access  Public
const updateOtherFeatures = asyncHandler(async (req, res) => {
    if (Object.keys(req.body).length === 0) {
        res.status(400)
        throw new Error("Request body is empty")
    }

    //const user = await User.findById(req.params.id)
    const user = await User.findOne({_id: req.user._id})

    // Check if user exists
    if (!user) {
        throw new NotFoundError();
    }

    const {user_fav_colour, user_noGo_colour, user_gender, user_age} = req.body


    if (!user_fav_colour || !user_noGo_colour || !user_gender || !user_age) {
        res.status(400)
        throw new Error('Please add all fields')
    }

    try {
        // Update the user
        user.set({
            gender: user_gender,
            age: user_age,
            favourite_colour: user_fav_colour,
            no_go_colour: user_noGo_colour,
        });
        await user.save();

        return res.status(201).json(user)

    } catch (err) {
        res.status(500)
        throw new Error("Internal server error")
    }

});


// @desc    login a user (e.g., generate the authentication token)
// @route   POST /api/users/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
    const {email, password} = req.body

    // Check for user email
    const user = await User.findOne({email})

    if (user && (await bcrypt.compare(password, user.password))) {
        res.json({
            _id: user._id,
            name: user.user_name,
            email: user.email,
            is_seller: user.is_seller,
            is_admin: user.is_admin,
            token: generateToken(user._id),
        })
    } else {
        res.status(400)
        throw new Error('Invalid credentials')
    }
});


// @desc    Update a user
// @route   PUT /api/users/:id
// @access  Private
const updateUser = asyncHandler(async (req, res) => {
    if (Object.keys(req.body).length === 0) {
        res.status(400)
        throw new Error("Request body is empty")
    }

    if (!req.user) {
        res.status(401)
        throw new Error('Unauthorized')
    }

    try {
        const user = await User.findByIdAndUpdate(req.user._id, req.body, {
            new: true,
        });
        return res.status(200).json(user);
    } catch (err) {
        return res.status(500).json({
            error: 'Internal server error',
            message: err.message
        });
    }
});

// @desc    Get data of the currently logged in user
// @route   GET /api/users/me
// @access  Private
const getMe = asyncHandler(async (req, res) => {
    if (!req.user) {
        res.status(401)
        throw new Error('Unauthorized')
    }
    const user = await User.findById({_id: req.user._id})
    res.status(200).json(user)
})

// Generate JWT
const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: '30d',
    })
}

module.exports = {
    getUsers,
    loginUser,
    getUserById,
    deleteUser,
    registerUser,
    updateUser,
    getMe,
    updateOtherFeatures,
    updateBodyMeasurements,
}


