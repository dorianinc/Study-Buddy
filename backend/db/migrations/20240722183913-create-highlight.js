"use strict";

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Highlights", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      annotationId: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      x1: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      y1: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      x2: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      y2: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      height: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      width: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      pageNumber: {
        type: Sequelize.INTEGER,
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
    },options);
  },
  down: async (queryInterface, Sequelize) => {
    options.tableName = 'Highlights'
    await queryInterface.dropTable(options);
  },
};
