"use strict";
const { faker } = require("@faker-js/faker");

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; 
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = "Notes";
    const notes = [];

    for (let i = 0; i < 10; i++) {
      notes.push({
        docId: faker.number.int({ min: 1, max: 10 }), 
        content: faker.lorem.paragraph(),
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }

    return queryInterface.bulkInsert(options, notes, {});
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = "Notes";
    return queryInterface.bulkDelete(options, null, {});
  },
};
