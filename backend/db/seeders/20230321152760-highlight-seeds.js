"use strict";

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA;
}

const highlightSeeds = () => {
  return [
    {
      id: 1,
      annotationId: "08c401b3-7240-4fe0-bcea-e493e6a92d07",
      x1: 64.9375,
      y1: 651.328125,
      x2: 148.788330078125,
      y2: 663.328125,
      width: 690,
      height: 892.9411764705882,
      pageNumber: 12,
      updatedAt: "2024-08-13T08:53:28.823Z",
      createdAt: "2024-08-13T08:53:28.823Z",
    },
    {
      id: 2,
      annotationId: "79793832-2f69-4912-8e86-39815197c146",
      x1: 75.484375,
      y1: 636.859375,
      x2: 135.36083984375,
      y2: 648.859375,
      width: 690,
      height: 892.9411764705882,
      pageNumber: 53,
      updatedAt: "2024-08-13T08:56:26.509Z",
      createdAt: "2024-08-13T08:56:26.509Z",
    },
    {
      id: 3,
      annotationId: "912a889e-ba02-48c9-a3bd-75f9a45d2606",
      x1: 64.9375,
      y1: 488.1875,
      x2: 128.76202392578125,
      y2: 505.1875,
      width: 690,
      height: 892.9411764705882,
      pageNumber: 61,
      updatedAt: "2024-08-13T08:57:12.835Z",
      createdAt: "2024-08-13T08:57:12.835Z",
    },
    {
      id: 4,
      annotationId: "470bfe15-85a1-49f8-b377-aeb3c3cec40e",
      x1: 71.890625,
      y1: 442.015625,
      x2: 331.800048828125,
      y2: 453.015625,
      width: 690,
      height: 892.9411764705882,
      pageNumber: 1,
      updatedAt: "2024-08-13T09:02:06.336Z",
      createdAt: "2024-08-13T09:02:06.336Z",
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
