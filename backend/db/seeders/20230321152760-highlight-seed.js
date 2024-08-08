"use strict";

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA;
}

const highlightSeeds = () => {
  return [
    {
      annotationId: "32604966305545835",
      type: "outer",
      x1: 48.42552185058594,
      y1: 353.2035827636719,
      x2: 264.80804443359375,
      y2: 372.0717468261719,
      width: 551,
      height: 713.0588235294117,
      pageNumber: 1,
    },
    {
      annotationId: "32604966305545835",
      type: "inner",
      x1: 57.39482116699219,
      y1: 353.2035827636719,
      x2: 264.80804443359375,
      y2: 362.2035827636719,
      width: 551,
      height: 713.0588235294117,
      pageNumber: 1,
    },
    {
      annotationId: "32604966305545835",
      type: "inner",
      x1: 48.42552185058594,
      y1: 363.0717468261719,
      x2: 248.294189453125,
      y2: 372.0717468261719,
      width: 551,
      height: 713.0588235294117,
      pageNumber: 1,
    },
    {
      annotationId: "7523977432979492",
      type: "outer",
      x1: 89.6534423828125,
      y1: 635.3316650390625,
      x2: 509.9925537109375,
      y2: 688.3629150390625,
      width: 1019.9999999999999,
      height: 1319.9999999999998,
      pageNumber: 4,
    },
    {
      annotationId: "7523977432979492",
      type: "inner",
      x1: 197.78125,
      y1: 635.3316650390625,
      x2: 509.154052734375,
      y2: 653.5894775390625,
      width: 1019.9999999999999,
      height: 1319.9999999999998,
      pageNumber: 4,
    },
    {
      annotationId: "7523977432979492",
      type: "inner",
      x1: 89.6534423828125,
      y1: 653.5972900390625,
      x2: 509.9925537109375,
      y2: 670.0972900390625,
      width: 1019.9999999999999,
      height: 1319.9999999999998,
      pageNumber: 4,
    },
    {
      annotationId: "7523977432979492",
      type: "inner",
      x1: 89.6556396484375,
      y1: 671.8629150390625,
      x2: 270.62860107421875,
      y2: 688.3629150390625,
      width: 1019.9999999999999,
      height: 1319.9999999999998,
      pageNumber: 4,
    },
    {
      annotationId: "9298580906684795",
      type: "outer",
      x1: 203.21282958984375,
      y1: 142.84837341308594,
      x2: 755.388427734375,
      y2: 1182.17626953125,
      width: 1019.9999999999999,
      height: 1319.9999999999998,
      pageNumber: 11,
    },
    {
      annotationId: "9298580906684795",
      type: "inner",
      x1: 529.91796875,
      y1: 142.84837341308594,
      x2: 755.388427734375,
      y2: 159.34837341308594,
      width: 1019.9999999999999,
      height: 1319.9999999999998,
      pageNumber: 11,
    },
    {
      annotationId: "9298580906684795",
      type: "inner",
      x1: 203.21282958984375,
      y1: 1165.67626953125,
      x2: 491.7064208984375,
      y2: 1182.17626953125,
      width: 1019.9999999999999,
      height: 1319.9999999999998,
      pageNumber: 11,
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
