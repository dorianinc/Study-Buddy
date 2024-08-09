"use strict";

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA;
}

const annotationSeeds = () => {
  const baseAnnotations = [
    { comment: "Better code!" },
    { comment: "This is a test..." },
    { comment: "Pumpernickel" },
  ];

  const seeds = [];
  let id = 1; // Initialize a unique id counter

  for (let i = 1; i <= 10; i++) {
    baseAnnotations.forEach((annotation) => {
      seeds.push({
        id: id++, // Increment the id counter for each new record
        authorId: 10,
        docUrl: "https://tinyurl.com/ynnxvva9",
        docId: i,
        comment: annotation.comment,
        type: "text"
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
