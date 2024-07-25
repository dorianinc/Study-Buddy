"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Note extends Model {
    static associate(models) {
      Note.belongsTo(models.Document, {
        foreignKey: "docId",
      });
    }
  }
  Note.init(
    {
      authorId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      docId: {
        type: DataTypes.INTEGER,
        allowNull: false,
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
