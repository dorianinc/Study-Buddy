const express = require("express");
const { validateLogin } = require("../../utils/validation");
const { restoreUser } = require("../../utils/auth");
const { sessionsController } = require("../../controllers");

const router = express.Router();

// Log in
router.post("/", validateLogin, sessionsController.loginUser);

// Restore session user
router.get("/", restoreUser, sessionsController.restoreUser);

// logout user
router.delete("/", sessionsController.logoutUser);

module.exports = router;
