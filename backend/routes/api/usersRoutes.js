const express = require("express");
const { validateSignup } = require("../../utils/validation");
const { usersController } = require("../../controllers");

const router = express.Router();

let baseMiddleware = [validateSignup];

// Sign up
router.post("/", baseMiddleware, usersController.signUpUser);

module.exports = router;
