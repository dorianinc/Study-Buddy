"use strict";

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA;
}

const highlightBoxSeeds = () => {
  return [
    {
      annotationId: "8411ebc0-d07a-4cb5-b977-ea19c6167366",
      x1: 64.9375,
      y1: 636.859375,
      x2: 314.1063232421875,
      y2: 662.65625,
      width: 690,
      height: 892.9411764705882,
      pageNumber: 53,
      updatedAt: "2024-08-13T20:21:10.917Z",
      createdAt: "2024-08-13T20:21:10.917Z",
    },
    {
      annotationId: "753a7a2c-9673-4e3d-be4d-22b47e9bf0da",
      x1: 370.484375,
      y1: 645.921875,
      x2: 610.8906860351562,
      y2: 699.21875,
      width: 690,
      height: 892.9411764705882,
      pageNumber: 13,
      updatedAt: "2024-08-13T20:25:38.635Z",
      createdAt: "2024-08-13T20:25:38.635Z",
    },
    {
      annotationId: "4fd3d01d-9826-4af6-a6f2-c0bca003fce2",
      x1: 83.328125,
      y1: 606.703125,
      x2: 455.8704833984375,
      y2: 639.640625,
      width: 948,
      height: 1226.8235294117646,
      pageNumber: 1,
      updatedAt: "2024-08-13T20:34:57.098Z",
      createdAt: "2024-08-13T20:34:57.098Z",
    },
    {
      annotationId: "a1630391-039c-412a-9afa-08d7b969de8c",
      x1: 83.328125,
      y1: 589.53125,
      x2: 455.5162353515625,
      y2: 639.390625,
      width: 948,
      height: 1226.8235294117646,
      pageNumber: 4,
      updatedAt: "2024-08-13T20:53:29.620Z",
      createdAt: "2024-08-13T20:53:29.620Z",
    },
    {
      annotationId: "8d88bfae-6bbc-4602-9134-7bf023a7f894",
      x1: 188.86123657226562,
      y1: 131.734375,
      x2: 865.007568359375,
      y2: 1098.53125,
      width: 948,
      height: 1226.8235294117646,
      pageNumber: 11,
      updatedAt: "2024-08-13T20:57:05.835Z",
      createdAt: "2024-08-13T20:57:05.835Z",
    },
    {
      annotationId: "edff7858-05c9-493e-aba5-440d7f7c60dd",
      x1: 87.359375,
      y1: 283,
      x2: 484.723388671875,
      y2: 341.96875,
      width: 537.55,
      height: 806.3333333333333,
      pageNumber: 2,
      updatedAt: "2024-08-13T21:01:21.783Z",
      createdAt: "2024-08-13T21:01:21.783Z",
    },
    {
      annotationId: "641859ae-fdfe-4500-a114-50483a2b4f09",
      x1: 48.40625,
      y1: 81.09375,
      x2: 373.6844482421875,
      y2: 118.09375,
      width: 537.55,
      height: 806.3333333333333,
      pageNumber: 3,
      updatedAt: "2024-08-13T21:04:54.667Z",
      createdAt: "2024-08-13T21:04:54.667Z",
    },
    {
      annotationId: "5beaadc7-3f17-46be-a41f-90227dd31061",
      x1: 87.734375,
      y1: 362.953125,
      x2: 484.470458984375,
      y2: 401.9375,
      width: 537.55,
      height: 806.3333333333333,
      pageNumber: 4,
      updatedAt: "2024-08-13T21:19:08.129Z",
      createdAt: "2024-08-13T21:19:08.129Z",
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
