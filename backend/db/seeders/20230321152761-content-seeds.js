"use strict";

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA;
}

const contentSeeds = () => {
  const seeds = [
    {
      id: 1,
      annotationId: "08c401b3-7240-4fe0-bcea-e493e6a92d07",
      text: "Rug of Smothering",
      updatedAt: "2024-08-13T08:53:28.792Z",
      createdAt: "2024-08-13T08:53:28.792Z",
    },
    {
      id: 2,
      annotationId: "79793832-2f69-4912-8e86-39815197c146",
      text: "Devil’s Sight.",
      updatedAt: "2024-08-13T08:56:26.482Z",
      createdAt: "2024-08-13T08:56:26.482Z",
    },
    {
      id: 3,
      annotationId: "912a889e-ba02-48c9-a3bd-75f9a45d2606",
      text: "Dinosaurs",
      updatedAt: "2024-08-13T08:57:12.805Z",
      createdAt: "2024-08-13T08:57:12.805Z",
    },
  ];

  return seeds;
};

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = "Contents";
    return queryInterface.bulkInsert(options, contentSeeds(), {});
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = "Contents";
    return queryInterface.bulkDelete(options, null, {});
  },
  contentSeeds,
};
