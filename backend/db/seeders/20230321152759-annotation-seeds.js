"use strict";

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA;
}

const annotationSeeds = () => {
  const seeds = [
    {
      id: "8411ebc0-d07a-4cb5-b977-ea19c6167366",
      authorId: 1,
      docId: 15,
      docUrl:
        "https://study-buddy-pdf-files.s3.us-west-1.amazonaws.com/1723536077471.pdf",
      type: "text",
      comment: "Can combo really well with darkness spell",
      updatedAt: "2024-08-13T20:21:10.884Z",
      createdAt: "2024-08-13T20:21:10.884Z",
    },
    {
      id: "753a7a2c-9673-4e3d-be4d-22b47e9bf0da",
      authorId: 1,
      docId: 15,
      docUrl:
        "https://study-buddy-pdf-files.s3.us-west-1.amazonaws.com/1723536077471.pdf",
      type: "text",
      comment: "Possibly the best subclass so far!",
      updatedAt: "2024-08-13T20:25:38.325Z",
      createdAt: "2024-08-13T20:25:38.325Z",
    },
    {
      id: "4fd3d01d-9826-4af6-a6f2-c0bca003fce2",
      authorId: 1,
      docId: 16,
      docUrl:
        "https://study-buddy-pdf-files.s3.us-west-1.amazonaws.com/1723536135698.pdf",
      type: "text",
      comment: "Better code!",
      updatedAt: "2024-08-13T20:34:57.069Z",
      createdAt: "2024-08-13T20:34:57.069Z",
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
