const bcrypt = require("bcryptjs");
const { setTokenCookie } = require("../utils/middleware/auth");
const { User } = require("../db/models");

const signUpUser = async (req, res) => {
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
};

module.exports = {
  signUpUser,
};
