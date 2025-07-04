const { Op } = require("sequelize");
const bcrypt = require("bcryptjs");
const { setTokenCookie } = require("../utils/middleware/auth");
const { User } = require("../db/models");

// Log in
const loginUser = async (req, res, next) => {
  const { credential, password } = req.body;

  let user;
  if (process.env.NODE_ENV === "production") {
    user = await User.unscoped().findOne({
      where: {
        [Op.or]: {
          username: { [Op.iLike]: credential },
          email: { [Op.iLike]: credential },
        },
      },
    });
  } else {
    user = await User.unscoped().findOne({
      where: {
        [Op.or]: {
          username: { [Op.like]: credential },
          email: { [Op.like]: credential },
        },
      },
    });
  }

  if (!user || !bcrypt.compareSync(password, user.hashedPassword.toString())) {
    const err = new Error("Login failed");
    err.status = 401;
    err.title = "Login failed";
    err.errors = { login: "The provided credentials were invalid." };
    return next(err);
  }

  const safeUser = {
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    username: user.username,
  };

  const token = await setTokenCookie(res, safeUser);

  return res.json({
    token: token,
    user: safeUser,
  });
};

// Restore session user
const restoreUser = async (req, res) => {
  const { user, token } = req;
  if (user) {
    const safeUser = {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      username: user.username,
    };
    return res.json({
      token: token,
      user: safeUser,
    });
  } else return res.json({ user: null });
};
// logout user
const logoutUser = async (req, res) => {
  res.clearCookie("token");
  return res.json({ message: "success" });
};

module.exports = {
  loginUser,
  logoutUser,
  restoreUser,
};
