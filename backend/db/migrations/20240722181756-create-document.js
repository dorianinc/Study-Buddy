"use strict";
/** @type {import('sequelize-cli').Migration} */
let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

module.exports = {
  up: async (queryInterface, Sequelize) =>  {
    await queryInterface.createTable("Documents", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
      },
      authorId: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      folderId: {
        type: Sequelize.INTEGER,
      },
      fileUrl: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      fileType: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      summary: {
        allowNull: false,
        type: Sequelize.TEXT,
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
    options.tableName = 'Documents'
    await queryInterface.dropTable(options);
  },
};
