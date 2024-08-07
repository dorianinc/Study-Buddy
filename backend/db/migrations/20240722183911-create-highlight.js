"use strict";

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable(
      "Highlights",
      {
        id: {
          allowNull: false,
          primaryKey: true,
          type: Sequelize.STRING,
        },
        type: {
          allowNull: false,
          type: Sequelize.STRING,
        },
        contentText: {
          type: Sequelize.TEXT,
          allowNull: true,
        },
        comment: {
          type: Sequelize.TEXT,
          allowNull: true,
        },
        boundingRectX1: {
          allowNull: false,
          type: Sequelize.INTEGER,
        },
        boundingRectY1: {
          allowNull: false,
          type: Sequelize.INTEGER,
        },
        boundingRectX2: {
          allowNull: false,
          type: Sequelize.INTEGER,
        },
        boundingRectY2: {
          allowNull: false,
          type: Sequelize.INTEGER,
        },
        boundingRectWidth: {
          allowNull: false,
          type: Sequelize.INTEGER,
        },
        boundingRectHeight: {
          allowNull: false,
          type: Sequelize.INTEGER,
        },
        boundingRectPageNumber: {
          allowNull: false,
          type: Sequelize.INTEGER,
        },
        docUrl: {
          type: Sequelize.STRING,
          allowNull: false,
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
    options.tableName = "Highlights";
    return queryInterface.dropTable(options);
  },
};
