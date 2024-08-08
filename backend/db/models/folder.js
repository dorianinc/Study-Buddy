"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Folder extends Model {
    static associate(models) {
      Folder.hasMany(models.Document, {
        foreignKey: "folderId",
        onDelete: "CASCADE",
        hooks: true,
      });

      Folder.belongsTo(models.User, { foreignKey: "userId" });
    }
  }
  Folder.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            args: true,
            msg: "Folder name is required.",
          },
          len: {
            args: [1, 25],
            msg: "Folder name must be between 1 and 25 characters long.",
          },
        },
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            args: true,
            msg: "User ID is required.",
          },
          isInt: {
            args: true,
            msg: "User ID must be an integer.",
          },
        },
      },
      category: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            args: true,
            msg: "Category is required.",
          },
          // isIn: {
          //   args: [["General", "Math", "Science", "History", "Literature"]],
          //   msg: "Category must be one of: General, Math, Science, History, Literature.",
          // },
        },
      },
    },
    {
      sequelize,
      modelName: "Folder",
      defaultScope: {
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      },
    }
  );
  return Folder;
};
