"use strict";
const { faker } = require("@faker-js/faker");

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA;
}

const documentSeeds = () => {
  const documents = [];
  const fileTypes = ["pdf", "doc", "docx", "txt"];

  for (let i = 0; i < 10; i++) {
    documents.push({
      name: faker.commerce.productName(),
      authorId: 10,
      folderId: faker.number.int({ min: 1, max: 5 }),
      fileUrl: faker.internet.url(),
      fileType: fileTypes[Math.floor(Math.random() * fileTypes.length)],
      summary: faker.lorem.paragraph(),
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }

  return documents;
};

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = "Documents";
    try {
      await queryInterface.bulkInsert(options, documentSeeds(), {});
    } catch (error) {
      console.error("Error while seeding documents:", error);
      throw error;
    }
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = "Documents";
    return queryInterface.bulkDelete(options, null, {});
  },
  documentSeeds,
};
