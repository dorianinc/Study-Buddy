"use strict";

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA;
}

const contentSeeds = () => {
  const contentItems = [
    {
      text: "The analysis indicates that TS applications exhibit significantly better code quality and understandability than JS applications.",
      image: null,
    },
    {
      text: "Frequently used instruments to evaluate code quality are code smells, i.e., indicators of low code quality which may impact maintainability",
      image: null,
    },
    {
      text: "We examined a total of 604 repositories (299 JS, 305 TS) with over 16M lines of code.",
      image: null,
    },
  ];

  const seeds = [];

  for (let i = 1; i <= 10; i++) {
    contentItems.forEach((content, index) => {
      seeds.push({
        annotationId: i,
        text: content.text,
        image: content.image
      });
    });
  }

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
