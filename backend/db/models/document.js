"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Document extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Document.belongsTo(models.Folder, { foreignKey: "folderId" });

      Document.belongsTo(models.User, { foreignKey: "authorId" });
      Document.hasMany(models.Note, {
        foreignKey: "docId",
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
      },
      authorId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      folderId: {
        type: DataTypes.INTEGER,
      },
      fileUrl: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      fileType: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      summary: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Document",
    }
  );
  return Document;
};
