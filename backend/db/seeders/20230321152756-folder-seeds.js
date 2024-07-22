"use strict";
const { faker } = require("@faker-js/faker");

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA;
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = "Folders";
    const folders = [];

    for (let i = 0; i < 5; i++) {
      folders.push({
        name: faker.commerce.department(),
        userId: faker.number.int({ min: 1, max: 10 }),
        category: faker.commerce.productMaterial(),
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }

    return queryInterface.bulkInsert(options, folders, {});
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = "Folders";
    return queryInterface.bulkDelete(options, null, {});
  },
};
