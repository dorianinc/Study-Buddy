'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Document extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Document.belongsTo(models.Folder)

      Document.belongsTo(models.User)
    }
  }
  Document.init({
    name:{
      type: DataTypes.STRING,
      allowNull:false
    },
    author_id:{
      type:DataTypes.INTEGER,
      allowNull:false
    },
    folder_id:{
      type:DataTypes.INTEGER
    },
    file_url:{
      type:DataTypes.STRING,
      allowNull:false
    },
    fileType:{
      type:DataTypes.STRING,
      allowNull:false
    }
  }, {
    sequelize,
    modelName: 'Document',
  });
  return Document;
};
