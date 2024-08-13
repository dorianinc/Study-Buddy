"use strict";
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; 
}

const userSeeds = () => {
  return [
    {
      email: "demo.email@email.com",
      username: "demo_user123",
      firstName: "Demo",
      lastName: "User",
      hashedPassword: bcrypt.hashSync("password1"),
    },
  ];
};

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = "Users";
    return queryInterface.bulkInsert(options, userSeeds(), {});
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = "Users";
    return queryInterface.bulkDelete(options, null, {});
  },
  userSeeds,
};
