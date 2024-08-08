"use strict";

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA;
}

const highlightBoxSeeds = () => {
  return [
    {
      annotationId: "32604966305545835",
      x1: 48.42552185058594,
      y1: 353.2035827636719,
      x2: 264.80804443359375,
      y2: 372.0717468261719,
      width: 551,
      height: 713.0588235294117,
      pageNumber: 1,
    },
    {
      annotationId: "7523977432979492",
      x1: 89.6534423828125,
      y1: 635.3316650390625,
      x2: 509.9925537109375,
      y2: 688.3629150390625,
      width: 1019.9999999999999,
      height: 1319.9999999999998,
      pageNumber: 4,
    },
    {
      annotationId: "9298580906684795",
      x1: 203.21282958984375,
      y1: 142.84837341308594,
      x2: 755.388427734375,
      y2: 1182.17626953125,
      width: 1019.9999999999999,
      height: 1319.9999999999998,
      pageNumber: 11,
    },
  ];
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
