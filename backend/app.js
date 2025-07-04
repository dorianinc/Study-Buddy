require("express-async-errors");
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const csurf = require("csurf");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");

const routes = require("./routes");

const { ValidationError } = require("sequelize");

const { environment } = require("./config");
const isProduction = environment === "production";
const isTesting = environment === "test";

const app = express();

// morgan logs HTTP requests, hide during testing
if (process.env.NODE_ENV !== "test") {
  app.use(morgan("dev"));
}

app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// /////////////////////////// Start of Security Middleware /////////////////////////
if (!isProduction) {
  // enable cors only in development
  app.use(cors());
}

// helmet helps set a variety of headers to better secure your app
app.use(
  helmet.crossOriginResourcePolicy({
    policy: "cross-origin",
  })
);
// Set the _csrf token and create req.csrfToken method
app.use(
  csurf({
    cookie: {
      secure: isProduction,
      sameSite: isProduction && "Lax",
      httpOnly: true,
    },
  })
);

// ////////////////////////// End of Security Middleware /////////////////////////

app.use(routes);

// ////////////////////////// Start of Error Handlers /////////////////////////
// Catch unhandled requests and forward to error handler.
app.use((_req, _res, next) => {
  const err = new Error("The requested resource couldn't be found.");
  err.title = "Resource Not Found";
  err.errors = { message: "The requested resource couldn't be found." };
  err.status = 404;
  next(err);
});

// Process sequelize errors
app.use((err, _req, _res, next) => {
  // check if error is a Sequelize error:
  if (err instanceof ValidationError) {
    let errors = {};
    for (let error of err.errors) {
      errors[error.path] = error.message;
    }
    err.title = "Validation error";
    err.errors = errors;
  }
  next(err);
});

// Error formatter

app.use((err, _req, res, _next) => {
  res.status(err.status || 500);
  if (!isTesting) console.error(err);
  res.json({
    title: err.title || "Server Error",
    message: err.message,
    errors: err.errors,
    stack: isProduction || isTesting ? null : err.stack,
  });
});

////////////////////////// End of Error Handlers /////////////////////////

module.exports = app;
