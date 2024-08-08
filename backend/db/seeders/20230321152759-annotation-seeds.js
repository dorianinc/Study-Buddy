"use strict";

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA;
}

const annotationSeeds = () => {
  const baseAnnotations = [
    {
      comment: "Better code!",
    },
    {
      comment: "This is a test...",
    },
    {
      comment: "That's a lot of repo's",
    },
  ];

  const seeds = [];

  for (let docId = 1; docId <= 10; docId++) {
    baseAnnotations.forEach((annotation, index) => {
      const uniqueId = `${docId}-${index + 1}`;
      seeds.push({
        id: uniqueId,
        authorId: 10,
        docUrl: "https://tinyurl.com/ynnxvva9",
        docId: docId,
        comment: annotation.comment,
      });
    });
  }

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
