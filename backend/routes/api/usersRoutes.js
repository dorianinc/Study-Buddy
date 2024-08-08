const express = require("express");
const { validateSignup } = require("../../utils/validation");
const { user } = require("../../controllers");

const router = express.Router();

let baseMiddleware = [validateSignup];

// Sign up
router.post("/", baseMiddleware, user.signUpUser);

module.exports = router;
