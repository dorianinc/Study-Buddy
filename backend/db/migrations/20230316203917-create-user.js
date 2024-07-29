"use strict";

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

module.exports = {
  // async up(queryInterface, Sequelize) {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable(
      "Users",
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        firstName: {
          allowNull: false,
          type: Sequelize.STRING(25),
        },
        lastName: {
          allowNull: false,
          type: Sequelize.STRING(25),
        },
        username: {
          allowNull: false,
          unique: true,
          type: Sequelize.STRING(15),
        },
        email: {
          allowNull: false,
          isEmail: true,
          unique: true,
          type: Sequelize.STRING,
        },
        hashedPassword: {
          allowNull: false,
          type: Sequelize.STRING.BINARY,
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
          defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE,
          defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
        },
      },
      options
    );
  },
  down: async (queryInterface, Sequelize) => {
    options.tableName = "Users";
    return queryInterface.dropTable(options);
  },
};
