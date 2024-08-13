"use strict";

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA;
}

const contentSeeds = () => {
  return [
    {
      annotationId: "8411ebc0-d07a-4cb5-b977-ea19c6167366",
      text: "Devil’s Sight. Magical darkness doesn't impede your Darkvision",
      updatedAt: "2024-08-13T20:21:10.905Z",
      createdAt: "2024-08-13T20:21:10.905Z",
    },
    {
      annotationId: "753a7a2c-9673-4e3d-be4d-22b47e9bf0da",
      text: "The Rug of Smothering is an interesting creature. It’s only offensive option is Smother, which is a fairly unique grapple mechanic when combined with Damage Transfer.",
      updatedAt: "2024-08-13T20:25:38.622Z",
      createdAt: "2024-08-13T20:25:38.622Z",
    },
    {
      annotationId: "4fd3d01d-9826-4af6-a6f2-c0bca003fce2",
      text: "The analysis indicates that TS applications exhibit significantly better code quality and understandability than JS applications.",
      updatedAt: "2024-08-13T20:34:57.085Z",
      createdAt: "2024-08-13T20:34:57.085Z",
    },
    {
      annotationId: "a1630391-039c-412a-9afa-08d7b969de8c",
      text: "Frequently used instruments to evaluate code quality are code smells, i.e., indicators of low code quality which may impact maintainability",
      updatedAt: "2024-08-13T20:53:29.607Z",
      createdAt: "2024-08-13T20:53:29.607Z",
    },
    {
      annotationId: "8d88bfae-6bbc-4602-9134-7bf023a7f894",
      text: "We examined a total of 604 repositories (299 JS, 305 TS) with over 16M lines of code. Statistical analysis revealed that TypeScript applications show significantly better code quality and understandability than JavaScript applications.",
      updatedAt: "2024-08-13T20:57:05.822Z",
      createdAt: "2024-08-13T20:57:05.822Z",
    },
    {
      annotationId: "edff7858-05c9-493e-aba5-440d7f7c60dd",
      text: "‘You may be a treasure,’ quoth Master Cock, ‘to men that prize you, but for me I would rather have a single barley-corn than a peck of pearls.’",
      updatedAt: "2024-08-13T21:01:21.770Z",
      createdAt: "2024-08-13T21:01:21.770Z",
    },
    {
      annotationId: "641859ae-fdfe-4500-a114-50483a2b4f09",
      text: "The Wolf and the Lamb",
      updatedAt: "2024-08-13T21:04:54.655Z",
      createdAt: "2024-08-13T21:04:54.655Z",
    },
    {
      annotationId: "5beaadc7-3f17-46be-a41f-90227dd31061",
      text: "Beware lest you lose the substance by grasping at the shadow.",
      updatedAt: "2024-08-13T21:19:08.109Z",
      createdAt: "2024-08-13T21:19:08.109Z",
    },
  ];
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
