"use strict";

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA;
}

const annotationSeeds = () => {
  const seeds = [
    {
      id: "08c401b3-7240-4fe0-bcea-e493e6a92d07",
      authorId: 1,
      docId: 15,
      docUrl: "https://tinyurl.com/ynnxvva9",
      type: "text",
      comment: "Best subrace so far",
      updatedAt: "2024-08-13T08:53:28.771Z",
      createdAt: "2024-08-13T08:53:28.771Z",
    },
    {
      id: "79793832-2f69-4912-8e86-39815197c146",
      authorId: 1,
      docId: 15,
      docUrl: "https://tinyurl.com/ynnxvva9",
      type: "text",
      comment: "Super strong with darkness",
      updatedAt: "2024-08-13T08:56:26.186Z",
      createdAt: "2024-08-13T08:56:26.186Z",
    },
    {
      id: "912a889e-ba02-48c9-a3bd-75f9a45d2606",
      authorId: 1,
      docId: 15,
      docUrl: "https://tinyurl.com/ynnxvva9",
      type: "text",
      comment: "Build character named Barney",
      updatedAt: "2024-08-13T08:57:12.787Z",
      createdAt: "2024-08-13T08:57:12.787Z",
    },
  ];

  return seeds;
};

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = "Annotations";
    return queryInterface.bulkInsert(options, annotationSeeds(), {});
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = "Annotations";
    return queryInterface.bulkDelete(options, null, {});
  },
  annotationSeeds,
};
