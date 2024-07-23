"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Note extends Model {
    static associate(models) {
      // Note.belongsTo(models.Document, {
      //   foreignKey: "docId",
      // });
      Note.belongsTo(models.Document)
    }
  }
  Note.init(
    {
      docId: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      content: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Note",
    }
  );
  return Note;
};
