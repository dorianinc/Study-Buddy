"use strict";

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable(
      "Notes",
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        authorId: {
          allowNull: false,
          type: Sequelize.INTEGER,
        },
        docId: {
          allowNull: false,
          type: Sequelize.INTEGER,
        },
        content: {
          allowNull: false,
          type: Sequelize.STRING,
        },
        highlightId:{
          allowNull: true,
          type:Sequelize.INTEGER
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
    options.tableName = "Notes";
    return queryInterface.dropTable(options);
  },
};
