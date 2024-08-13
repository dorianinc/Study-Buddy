"use strict";
const { faker } = require("@faker-js/faker");

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA;
}

const folderSeeds = () => {
  const folders = [
    {
      id: 1,
      userId: 1,
      name: "Math",
      category: "Math",
      updatedAt: "2024-08-13T07:37:22.814Z",
      createdAt: "2024-08-13T07:37:22.814Z",
    },
    {
      id: 2,
      userId: 1,
      name: "Plants",
      category: "Science",
      updatedAt: "2024-08-13T07:44:23.351Z",
      createdAt: "2024-08-13T07:44:23.351Z",
    },
    {
      id: 3,
      userId: 1,
      name: "History",
      category: "History",
      updatedAt: "2024-08-13T07:51:12.076Z",
      createdAt: "2024-08-13T07:51:12.076Z",
    },
    {
      id: 4,
      userId: 1,
      name: "Books",
      category: "General",
      updatedAt: "2024-08-13T07:55:13.519Z",
      createdAt: "2024-08-13T07:55:13.519Z",
    },
    {
      id: 5,
      userId: 1,
      name: "Etc...",
      category: "General",
      updatedAt: "2024-08-13T08:00:18.271Z",
      createdAt: "2024-08-13T08:00:18.271Z",
    },
  ];

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
