const express = require("express");
const router = express.Router();
const {
    registerUser,
    getUsers,
    getUserById,
    deleteUser,
    updateUser,
    loginUser,
    getMe,
    updateOtherFeatures,
    updateBodyMeasurements,
} = require('../controllers/user.controller');

const {protect} = require('../middleware/auth.middleware');

router.route('/')
    .get(getUsers)

router.route('/register')
    .post(registerUser);

router.route('/login')
    .post(loginUser)

router.route('/profile')
    .put(protect, updateUser)

router.route('/body_measurements/')
    .put(protect, updateBodyMeasurements)

router.route('/other_features/')
    .put(protect, updateOtherFeatures)

router.route('/me')
    .get(protect, getMe)

router.route('/:id')
    .get(getUserById)
    .delete(deleteUser)
    .put(updateUser);


// development functions only for rapid development (will be removed in final production code)
router.route('/dev/me')
    .get(getMe)
router.route('/dev/body_measurements/:id')
    .put(updateBodyMeasurements)
router.route('/dev/other_features/:id')
    .put(updateOtherFeatures)

module.exports = router;
