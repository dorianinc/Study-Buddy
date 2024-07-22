"use strict";

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.createTable(
      "Notes",{
        id: {
          allNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTENGER
        },
        doc_id: {
          allowNull:true,
          type: Sequelize.INTEGER
        },
        content: {
          allowNull: false,
          type: Sequelize.STRING(1234)
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
    )
  },

  async down (queryInterface, Sequelize) {
    options.tableName = "Notes";
    return queryInterface.dropTable(options);
  }
};
