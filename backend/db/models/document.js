"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Document extends Model {
    static associate(models) {
      Document.belongsTo(models.Folder, { foreignKey: "folderId" });
      Document.belongsTo(models.User, { foreignKey: "authorId" });
      Document.hasMany(models.Note, {
        foreignKey: "docId",
        onDelete: "CASCADE",
        hooks: true,
      });
      Document.hasMany(models.Annotation, {
        foreignKey: "docUrl", // The key in Annotation
        sourceKey: "fileUrl", // The key in Document
        onDelete: "CASCADE",
        hooks: true,
      });
    }
  }

  Document.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "Document name is required." },
          len: {
            args: [1, 25],
            msg: "Document name must be between 1 and 25 characters long.",
          },
        },
      },
      authorId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: { msg: "Author ID is required." },
          isInt: { msg: "Author ID must be an integer." },
        },
      },
      folderId: {
        type: DataTypes.INTEGER,
        validate: {
          isInt: { msg: "Folder ID must be an integer." },
        },
      },
      fileUrl: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notNull: { msg: "File URL is required." },
          isUrl: { msg: "File URL must be a valid URL." },
        },
      },
      fileType: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "File type is required." },
          isIn: { args: [["pdf"]], msg: "File type must be pdf." },
        },
      },
      summary: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "Summary is required." },
          len: {
            args: [1, 1000],
            msg: "Summary must be between 1 and 1000 characters long.",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "Document",
      defaultScope: {
        attributes: {
          // exclude: ["createdAt", "updatedAt"],
        },
      },
    }
  );

  return Document;
};
