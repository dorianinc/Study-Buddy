// transactionMiddleware.js
const { sequelize } = require("../db/models"); // Adjust path as necessary

const isTesting = process.env.NODE_ENV === "test"; // Check if in test environment

const transactionHandler = async (_req, _res, next) => {
    let transaction;
    if (isTesting) {
      transaction = await sequelize.transaction();
    }
  
    try {
      await next();
    } finally {
      if (isTesting) {
        if (transaction) {
          await transaction.rollback();
        }
      }
    }
  };

module.exports = {
  transactionHandler,
};
