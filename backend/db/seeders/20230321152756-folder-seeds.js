"use strict";
const { faker } = require("@faker-js/faker");

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA;
}

const folderSeeds = () => {
  return [
    {
      userId: 1,
      name: "Math",
      category: "Math",
      updatedAt: "2024-08-13T07:37:22.814Z",
      createdAt: "2024-08-13T07:37:22.814Z",
    },
    {
      userId: 1,
      name: "Plants",
      category: "Science",
      updatedAt: "2024-08-13T07:44:23.351Z",
      createdAt: "2024-08-13T07:44:23.351Z",
    },
    {
      userId: 1,
      name: "History",
      category: "History",
      updatedAt: "2024-08-13T07:51:12.076Z",
      createdAt: "2024-08-13T07:51:12.076Z",
    },
    {
      userId: 1,
      name: "Books",
      category: "General",
      updatedAt: "2024-08-13T07:55:13.519Z",
      createdAt: "2024-08-13T07:55:13.519Z",
    },
    {
      userId: 1,
      name: "Etc...",
      category: "General",
      updatedAt: "2024-08-13T08:00:18.271Z",
      createdAt: "2024-08-13T08:00:18.271Z",
    },
  ];
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
