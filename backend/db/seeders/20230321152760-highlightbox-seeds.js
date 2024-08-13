"use strict";

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA;
}

const highlightBoxSeeds = () => {
  const seeds = [
    {
      id: 1,
      annotationId: "8411ebc0-d07a-4cb5-b977-ea19c6167366",
      x1: 64.9375,
      y1: 636.859375,
      x2: 314.1063232421875,
      y2: 662.65625,
      width: 690,
      height: 892.9411764705882,
      pageNumber: 53,
      updatedAt: "2024-08-13T20:21:10.917Z",
      createdAt: "2024-08-13T20:21:10.917Z",
    },
    {
      id: 2,
      annotationId: "753a7a2c-9673-4e3d-be4d-22b47e9bf0da",
      x1: 370.484375,
      y1: 645.921875,
      x2: 610.8906860351562,
      y2: 699.21875,
      width: 690,
      height: 892.9411764705882,
      pageNumber: 13,
      updatedAt: "2024-08-13T20:25:38.635Z",
      createdAt: "2024-08-13T20:25:38.635Z",
    },
    {
      id: 3,
      annotationId: "4fd3d01d-9826-4af6-a6f2-c0bca003fce2",
      x1: 83.328125,
      y1: 606.703125,
      x2: 455.8704833984375,
      y2: 639.640625,
      width: 948,
      height: 1226.8235294117646,
      pageNumber: 1,
      updatedAt: "2024-08-13T20:34:57.098Z",
      createdAt: "2024-08-13T20:34:57.098Z",
    },
  ];

  return seeds;
};

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = "HighlightBoxes";
    return queryInterface.bulkInsert(options, highlightBoxSeeds(), {});
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = "HighlightBoxes";
    return queryInterface.bulkDelete(options, null, {});
  },
  highlightBoxSeeds,
};
