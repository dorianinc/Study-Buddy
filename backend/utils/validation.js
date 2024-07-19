const { validationResult } = require("express-validator");
const { check } = require("express-validator");

// main function that makes validation handling work
const handleValidationErrors = (req, res, next) => {
  const validationErrors = validationResult(req);

  if (!validationErrors.isEmpty()) {
    const errors = {};
    validationErrors.array().forEach((error) => (errors[error.param] = error.msg));

    const err = Error("Bad Request");
    err.errors = errors;
    err.status = 400;
    err.title = "Bad Request";
    next(err);
  }
  next();
};
// validator for when new user is signing up
const validateSignup = [
  check("firstName").exists({ checkFalsy: true }).withMessage("First Name is required"),
  check("lastName").exists({ checkFalsy: true }).withMessage("Last Name is required"),
  check("email")
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage("The provided email is invalid."),
  check("username")
    .exists({ checkFalsy: true })
    .isLength({ min: 4 })
    .withMessage("Please provide a username with at least 4 characters."),
  check("username").not().isEmail().withMessage("Username cannot be an email."),
  check("password")
    .exists({ checkFalsy: true })
    .isLength({ min: 6 })
    .withMessage("Password must be 6 characters or more."),
  handleValidationErrors,
];

// validator for when a user is trying to long in
const validateLogin = [
  check("credential")
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage("Please provide a valid email or username."),
  check("password").exists({ checkFalsy: true }).withMessage("Please provide a password."),
  handleValidationErrors,
];





module.exports = {
  validateSignup,
  validateLogin,
};
