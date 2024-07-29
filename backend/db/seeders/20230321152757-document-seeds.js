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

    const fileTypes = ["pdf", "doc", "docx", "txt"]; // File types allowed

    for (let i = 0; i < 10; i++) {
      documents.push({
        name: faker.commerce.productName(),
        authorId: 10,
        folderId: faker.number.int({ min: 1, max: 5 }), // Adjust range as needed
        fileUrl: faker.internet.url(),
        fileType: fileTypes[Math.floor(Math.random() * fileTypes.length)],
        summary: faker.lorem.paragraph(), // Generates a summary text
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }

    try {
      await queryInterface.bulkInsert(options, documents, {});
    } catch (error) {
      console.error("Error while seeding documents:", error);
      throw error;
    }
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = "Documents";
    return queryInterface.bulkDelete(options, null, {});
  },
};
