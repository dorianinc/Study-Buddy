"use strict";
const { faker } = require("@faker-js/faker");

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA;
}

const noteSeeds = () => {
  const notes = [];

  for (let i = 0; i < 10; i++) {
    notes.push({
      authorId: 10,
      docId: faker.number.int({ min: 1, max: 10 }),
      content: faker.lorem.paragraph(),
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }

  return notes;
};

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = "Notes";
    return queryInterface.bulkInsert(options, noteSeeds(), {});
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = "Notes";
    return queryInterface.bulkDelete(options, null, {});
  },
  noteSeeds,
};
