"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Note extends Model {
    static associate(models) {
      Note.belongsTo(models.Document, {
        foreignKey: "docId",
      });
      Note.belongsTo(models.Highlight)
    }
  }
  Note.init(
    {
      authorId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            args: true,
            msg: "Author ID is required.",
          },
          isInt: {
            args: true,
            msg: "Author ID must be an integer.",
          },
        },
      },
      docId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            args: true,
            msg: "Document ID is required.",
          },
          isInt: {
            args: true,
            msg: "Document ID must be an integer.",
          },
        },
      },
      content: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            args: true,
            msg: "Content is required.",
          },
          len: {
            args: [1, 1000],
            msg: "Content must be between 1 and 1000 characters long.",
          },
        },
      },
      highlightId:{
        type:DataTypes.INTEGER,
        allowNull:true
      }
    },
    {
      sequelize,
      modelName: "Note",
      defaultScope: {
        attributes: {
          // exclude: ["createdAt", "updatedAt"],
        },
      },
    }
  );
  return Note;
};
