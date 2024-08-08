"use strict";
const { Model, Validator } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Document extends Model {
    static associate(models) {
      // define association here
      Document.belongsTo(models.Folder, { foreignKey: "folderId" });
      Document.belongsTo(models.User, { foreignKey: "authorId" });
      Document.hasMany(models.Note, {
        foreignKey: "docId",
        onDelete: "CASCADE",
        hooks: true,
      });
      Document.hasMany(models.Highlight, {
        foreignKey: "docUrl",
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
          notNull: {
            args: true,
            msg: "Document name is required.",
          },
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
      folderId: {
        type: DataTypes.INTEGER,
        validate: {
          isInt: {
            args: true,
            msg: "Folder ID must be an integer.",
          },
        },
      },
      fileUrl: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            args: true,
            msg: "File URL is required.",
          },
          isUrl: {
            args: true,
            msg: "File URL must be a valid URL.",
          },
        },
      },
      fileType: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            args: true,
            msg: "File type is required.",
          },
          isIn: {
            args: [["pdf"]], // Adjust the file types as needed
            msg: "File type must be pdf.",
          },
        },
      },
      summary: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            args: true,
            msg: "Summary is required.",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "Document",
    }
  );

  return Document;
};
