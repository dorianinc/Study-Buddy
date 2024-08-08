"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Annotation extends Model {
    static associate(models) {
      Annotation.belongsTo(models.Document, {
        foreignKey: "docId",
      });
      Annotation.belongsTo(models.User, { foreignKey: "authorId" });
      Annotation.hasMany(models.Content, {
        foreignKey: "annotationId",
        onDelete: "CASCADE",
      });
      Annotation.hasMany(models.Highlight, {
        foreignKey: "annotationId",
        onDelete: "CASCADE",
      });
    }
  }

  Annotation.init(
    {
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
      },
      authorId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      docId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      docUrl: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      comment: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "Annotation",
      defaultScope: {
        attributes: {
          exclude: ["authorId", "docId"],
        },
      },
    }
  );

  return Annotation;
};
