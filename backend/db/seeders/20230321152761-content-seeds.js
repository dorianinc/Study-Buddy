"use strict";

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA;
}

const contentSeeds = () => {
  const seeds = [
    {
      id: 1,
      annotationId: "8411ebc0-d07a-4cb5-b977-ea19c6167366",
      text: "Devil’s Sight. Magical darkness doesn't impede your Darkvision",
      updatedAt: "2024-08-13T20:21:10.905Z",
      createdAt: "2024-08-13T20:21:10.905Z",
    },
    {
      id: 2,
      annotationId: "753a7a2c-9673-4e3d-be4d-22b47e9bf0da",
      text: "The Rug of Smothering is an interesting creature. It’s only offensive option is Smother, which is a fairly unique grapple mechanic when combined with Damage Transfer.",
      updatedAt: "2024-08-13T20:25:38.622Z",
      createdAt: "2024-08-13T20:25:38.622Z",
    },
    {
      id: 3,
      annotationId: "4fd3d01d-9826-4af6-a6f2-c0bca003fce2",
      text: "The analysis indicates that TS applications exhibit significantly better code quality and understandability than JS applications.",
      updatedAt: "2024-08-13T20:34:57.085Z",
      createdAt: "2024-08-13T20:34:57.085Z",
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
