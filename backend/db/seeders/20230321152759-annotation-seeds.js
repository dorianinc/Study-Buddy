"use strict";

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA;
}

const annotationSeeds = () => {
  return [
    {
      id: "32604966305545835",
      authorId: 10,
      docId: 1,
      comment: "Better code!",
    },
    {
      id: "7523977432979492",
      authorId: 10,
      docId: 1,
      comment: "This is a test...",
    },
    {
      id: "9298580906684795",
      authorId: 10,
      docId: 1,
      comment: "That's alot of repo's",
    },
  ];
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
