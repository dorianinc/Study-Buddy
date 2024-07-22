'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Folder extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Folder.hasMany(models.Document,{
        foreignKey:'folderId',
        onDelete:'CASCADE',
        hooks:true
      })

      Folder.belongsTo(models.User)
    }
  }
  Folder.init({
    name: {
      type: DataTypes.STRING,
      allowNull:false
    },
    userId:{
      type:DataTypes.INTEGER,
      allowNull:false
    },
    category:{
      type:DataTypes.STRING,
      allowNull:true
    }
  }, {
    sequelize,
    modelName: 'Folder',
  });
  return Folder;
};
