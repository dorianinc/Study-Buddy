"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Content extends Model {
    static associate(models) {
      Content.belongsTo(models.Annotation, { foreignKey: "annotationId" });
    }
  }

  Content.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      annotationId: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      text: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      image: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "Content",
      defaultScope: {
        attributes: {
          exclude: ["createdAt", "updatedAt", "annotationId"],
        },
      },
    }
  );

  return Content;
};
