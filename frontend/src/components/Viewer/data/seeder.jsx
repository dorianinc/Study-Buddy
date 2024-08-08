"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "Highlights",
      [
        {
          id: "32604966305545835",
          type: "text",
          contentText:
            "The analysis indicates that TS applications exhibit significantly better code quality and understandability than JS applications.",
          comment: "Better code!",
          boundingRectX1: 48.42552185058594,
          boundingRectY1: 353.2035827636719,
          boundingRectX2: 264.80804443359375,
          boundingRectY2: 372.0717468261719,
          boundingRectWidth: 551,
          boundingRectHeight: 713.0588235294117,
          boundingRectPageNumber: 1,
          docUrl: "https://tinyurl.com/ynnxvva9",
        },
        {
          id: "7523977432979492",
          type: "text",
          contentText:
            "Frequently used instruments to evaluate code quality are code smells, i.e., indicators of low code quality which may impact maintainability",
          boundingRectX1: 89.6534423828125,
          boundingRectY1: 635.3316650390625,
          boundingRectX2: 509.9925537109375,
          boundingRectY2: 688.3629150390625,
          boundingRectWidth: 1019.9999999999999,
          boundingRectHeight: 1319.9999999999998,
          boundingRectPageNumber: 4,
          docUrl: "https://tinyurl.com/ynnxvva9",
        },
        {
          id: "9298580906684795",
          type: "text",
          contentText:
            "We examined a total of 604 repositories (299 JS, 305 TS) with over 16M lines of code.",
          boundingRectX1: 203.21282958984375,
          boundingRectY1: 142.84837341308594,
          boundingRectX2: 755.388427734375,
          boundingRectY2: 1182.17626953125,
          boundingRectWidth: 1019.9999999999999,
          boundingRectHeight: 1319.9999999999998,
          boundingRectPageNumber: 11,
          docUrl: "https://tinyurl.com/ynnxvva9",
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Highlights", null, {});
  },
};
