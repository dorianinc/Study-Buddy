"use strict";
const { faker } = require("@faker-js/faker");

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA;
}

const documentSeeds = () => {
  const documents = [];

  for (let i = 0; i < 5; i++) {
    documents.push({
      name: faker.commerce.productName(),
      authorId: 10,
      folderId: 1,
      fileUrl: "https://tinyurl.com/ynnxvva9",
      fileType: "pdf",
      summary: faker.lorem.paragraph(),
    });
  }

  for (let i = 0; i < 5; i++) {
    documents.push({
      name: faker.commerce.productName(),
      authorId: 10,
      folderId: faker.number.int({ min: 2, max: 5 }),
      fileUrl: "https://tinyurl.com/ynnxvva9",
      fileType: "pdf",
      summary: faker.lorem.paragraph(),
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
