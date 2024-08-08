"use strict";
const { Model} = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Highlight extends Model {
    static associate(models) {
      Highlight.belongsTo(models.Document, {
        foreignKey: "docUrl",
      });

      Highlight.hasOne(models.Note)
    }
  }

  Highlight.init(
    {
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
        validate: {
          notNull: {
            args: true,
            msg: "ID is required.",
          },
        },
      },
      type: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            args: true,
            msg: "Type is required.",
          },
        },
      },
      contentText: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      comment: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      boundingRectX1: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            args: true,
            msg: "Bounding Rect X1 is required.",
          },
        },
      },
      boundingRectY1: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            args: true,
            msg: "Bounding Rect Y1 is required.",
          },
        },
      },
      boundingRectX2: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            args: true,
            msg: "Bounding Rect X2 is required.",
          },
        },
      },
      boundingRectY2: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            args: true,
            msg: "Bounding Rect Y2 is required.",
          },
        },
      },
      boundingRectWidth: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            args: true,
            msg: "Bounding Rect Width is required.",
          },
        },
      },
      boundingRectHeight: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            args: true,
            msg: "Bounding Rect Height is required.",
          },
        },
      },
      boundingRectPageNumber: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            args: true,
            msg: "Bounding Rect Page Number is required.",
          },
        },
      },
      docUrl: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            args: true,
            msg: "Document URL is required.",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "Highlight",
    }
  );

  return Highlight;
};
