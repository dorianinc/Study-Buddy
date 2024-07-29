"use strict";
const { faker } = require("@faker-js/faker");

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA;
}

const folderSeeds = () => {
  const folders = [];
  const categories = ["General", "Math", "Science", "History", "Literature"];

  for (let i = 0; i < 5; i++) {
    folders.push({
      name: faker.commerce.department(),
      userId: 10,
      category:
        categories[faker.number.int({ min: 0, max: categories.length - 1 })],
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }

  return folders;
};

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = "Folders";
    return queryInterface.bulkInsert(options, folderSeeds(), {});
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = "Folders";
    return queryInterface.bulkDelete(options, null, {});
  },
  folderSeeds,
};
