const express = require("express");
const { validateLogin } = require("../../utils/middleware/validation");
const { restoreUser } = require("../../utils/middleware/auth");
const { session } = require("../../controllers");

const router = express.Router();

// Log in
router.post("/", validateLogin, session.loginUser);

// Restore session user
router.get("/", restoreUser, session.restoreUser);

// logout user
router.delete("/", session.logoutUser);

module.exports = router;
