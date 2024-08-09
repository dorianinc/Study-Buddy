"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Highlight extends Model {
    static associate(models) {
      Highlight.belongsTo(models.Annotation, { foreignKey: "annotationId" });
      Highlight.hasOne(models.Note)
    }
  }

  Highlight.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      annotationId: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      x1: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      y1: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      x2: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      y2: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      height: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      width: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      pageNumber: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Highlight",
      defaultScope: {
        attributes: {
          exclude: ["createdAt", "updatedAt", "annotationId"],
        },
      },
    }
  );

  return Highlight;
};
