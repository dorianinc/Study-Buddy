"use strict";
const { faker } = require("@faker-js/faker");

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA;
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = "Documents";
    const documents = [];

    for (let i = 0; i < 10; i++) {
      documents.push({
        name: faker.commerce.productName(),
        authorId: faker.number.int({ min: 1, max: 10 }), 
        folderId: faker.number.int({ min: 1, max: 5 }),
        fileUrl: faker.internet.url(),
        fileType: faker.system.fileExt(),
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }

    return queryInterface.bulkInsert(options, documents, {});
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = "Documents";
    return queryInterface.bulkDelete(options, null, {});
  },
};
