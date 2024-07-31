const express = require("express");
const bcrypt = require("bcryptjs");
const { validateSignup } = require("../../utils/validation");
const { setTokenCookie} = require("../../utils/auth");
const { transactionHandler } = require("../../utils/transaction.js");
const { User } = require("../../db/models");

const router = express.Router();

// Sign up
router.post("/", [validateSignup, transactionHandler], async (req, res) => {
  const { email, firstName, lastName, password, username } = req.body;
  const hashedPassword = bcrypt.hashSync(password);
  const user = await User.create({
    firstName,
    lastName,
    email,
    username,
    hashedPassword,
  });

  const safeUser = {
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    username: user.username,
  };

  const token = await setTokenCookie(res, safeUser);

  return res.status(201).json({
    token: token,
    user: safeUser,
  });
});

module.exports = router;
