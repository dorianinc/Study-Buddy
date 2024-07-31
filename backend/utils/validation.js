const { validationResult } = require("express-validator");
const { check } = require("express-validator");

// main function that makes validation handling work
const handleValidationErrors = (req, res, next) => {
  const validationErrors = validationResult(req);

  if (!validationErrors.isEmpty()) {
    const errors = {};
    validationErrors
      .array()
      .forEach((error) => (errors[error.param] = error.msg));

    const err = Error("Bad Request");
    err.errors = errors;
    err.status = 400;
    err.title = "Bad Request";
    next(err);
  }
  next();
};

// Validator for when a new user is signing up
const validateSignup = [
  check("firstName")
    .isAlpha()
    .withMessage("First name can only contain letters.")
    .exists({ checkFalsy: true })
    .withMessage("First Name is required.")
    .isLength({ min: 1, max: 25 })
    .withMessage("First name must be between 1 and 25 characters long."),

  check("lastName")
    .isAlpha()
    .withMessage("Last name can only contain letters.")
    .exists({ checkFalsy: true })
    .withMessage("Last Name is required.")
    .isLength({ min: 1, max: 25 })
    .withMessage("Last name must be between 1 and 25 characters long."),

  check("email")
    .isEmail()
    .withMessage("Must be a valid email address.")
    .exists({ checkFalsy: true })
    .withMessage("Email is required.")
    .isLength({ min: 5, max: 30 })
    .withMessage("Email must be between 5 and 30 characters long."),

  check("username")
    .exists({ checkFalsy: true })
    .withMessage("Username is required.")
    .not()
    .isEmail()
    .withMessage("Username cannot be an email address.")
    .isLength({ min: 5, max: 15 })
    .withMessage("Username must be between 5 and 15 characters long."),

  check("password")
    .exists({ checkFalsy: true })
    .withMessage("Password is required.")
    .isLength({ min: 6, max: 20 })
    .withMessage("Password must be between 6 and 20 characters long."),

  handleValidationErrors,
];

// validator for when a user is trying to long in
const validateLogin = [
  check("credential")
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage("Please provide a valid email or username."),
  check("password")
    .exists({ checkFalsy: true })
    .withMessage("Please provide a password."),
  handleValidationErrors,
];

module.exports = {
  validateSignup,
  validateLogin,
};
