"use strict";

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA;
}

const contentSeeds = () => {
  return [
    {
      annotationId: "32604966305545835",
      type: "text",
      text: "The analysis indicates that TS applications exhibit significantly better code quality and understandability than JS applications.",
      image: null,
    },
    {
      annotationId: "7523977432979492",
      type: "text",
      text: "Frequently used instruments to evaluate code quality are code smells, i.e., indicators of low code quality which may impact maintainability",
      image: null,
    },
    {
      annotationId: "9298580906684795",
      type: "text",
      text: "We examined a total of 604 repositories (299 JS, 305 TS) with over 16M lines of code.",
      image: null,
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
