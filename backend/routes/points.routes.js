const express = require("express");
const { getPoints, addPoints, deductPoints } = require("../controllers/points.controller");
const {protect} = require("../middleware/auth.middleware");

const router = express.Router();

router.route('/')
    .get(protect, getPoints)
    .put(protect, addPoints)

router.route('/use-points')
    .put(protect, deductPoints)

module.exports = router;