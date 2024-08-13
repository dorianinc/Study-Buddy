"use strict";

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA;
}

const highlightSeeds = () => {
  return [
    {
      id: 1,
      annotationId: "8411ebc0-d07a-4cb5-b977-ea19c6167366",
      x1: 75.484375,
      y1: 636.859375,
      x2: 314.1063232421875,
      y2: 648.859375,
      width: 690,
      height: 892.9411764705882,
      pageNumber: 53,
      updatedAt: "2024-08-13T20:21:10.933Z",
      createdAt: "2024-08-13T20:21:10.933Z",
    },
    {
      id: 2,
      annotationId: "8411ebc0-d07a-4cb5-b977-ea19c6167366",
      x1: 64.9375,
      y1: 650.65625,
      x2: 112.73834228515625,
      y2: 662.65625,
      width: 690,
      height: 892.9411764705882,
      pageNumber: 53,
      updatedAt: "2024-08-13T20:21:10.945Z",
      createdAt: "2024-08-13T20:21:10.945Z",
    },
    {
      id: 3,
      annotationId: "753a7a2c-9673-4e3d-be4d-22b47e9bf0da",
      x1: 370.484375,
      y1: 645.921875,
      x2: 610.8906860351562,
      y2: 657.921875,
      width: 690,
      height: 892.9411764705882,
      pageNumber: 13,
      updatedAt: "2024-08-13T20:25:38.648Z",
      createdAt: "2024-08-13T20:25:38.648Z",
    },
    {
      id: 4,
      annotationId: "753a7a2c-9673-4e3d-be4d-22b47e9bf0da",
      x1: 370.484375,
      y1: 659.59375,
      x2: 594.21826171875,
      y2: 671.59375,
      width: 690,
      height: 892.9411764705882,
      pageNumber: 13,
      updatedAt: "2024-08-13T20:25:38.660Z",
      createdAt: "2024-08-13T20:25:38.660Z",
    },
    {
      id: 5,
      annotationId: "753a7a2c-9673-4e3d-be4d-22b47e9bf0da",
      x1: 370.484375,
      y1: 673.421875,
      x2: 585.09130859375,
      y2: 685.421875,
      width: 690,
      height: 892.9411764705882,
      pageNumber: 13,
      updatedAt: "2024-08-13T20:25:38.673Z",
      createdAt: "2024-08-13T20:25:38.673Z",
    },
    {
      id: 6,
      annotationId: "753a7a2c-9673-4e3d-be4d-22b47e9bf0da",
      x1: 370.484375,
      y1: 687.21875,
      x2: 451.4620361328125,
      y2: 699.21875,
      width: 690,
      height: 892.9411764705882,
      pageNumber: 13,
      updatedAt: "2024-08-13T20:25:38.685Z",
      createdAt: "2024-08-13T20:25:38.685Z",
    },

    {
      id: 7,
      annotationId: "4fd3d01d-9826-4af6-a6f2-c0bca003fce2",
      x1: 98.78125,
      y1: 606.703125,
      x2: 455.8704833984375,
      y2: 622.703125,
      width: 948,
      height: 1226.8235294117646,
      pageNumber: 1,
      updatedAt: "2024-08-13T20:34:57.113Z",
      createdAt: "2024-08-13T20:34:57.113Z",
    },
    {
      id: 8,
      annotationId: "4fd3d01d-9826-4af6-a6f2-c0bca003fce2",
      x1: 83.328125,
      y1: 623.640625,
      x2: 430.6865234375,
      y2: 639.640625,
      width: 948,
      height: 1226.8235294117646,
      pageNumber: 1,
      updatedAt: "2024-08-13T20:34:57.125Z",
      createdAt: "2024-08-13T20:34:57.125Z",
    },
  ];
};

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = "Highlights";
    return queryInterface.bulkInsert(options, highlightSeeds(), {});
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = "Highlights";
    return queryInterface.bulkDelete(options, null, {});
  },
  highlightSeeds,
};
