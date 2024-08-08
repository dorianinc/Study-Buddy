"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Highlight extends Model {
    static associate(models) {
      Highlight.belongsTo(models.Annotation, { foreignKey: "annotationId" });
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
      type: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      x1: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      y1: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      x2: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      y2: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      height: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      width: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      page: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Highlight",
      tableName: "Highlights",
    }
  );

  return Highlight;
};
