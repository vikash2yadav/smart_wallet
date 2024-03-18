'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class goals extends Model {
    static associate(models) {
      // define association here
    }
  }
  goals.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.BIGINT(20).UNSIGNED
    },
    user_id:{
      allowNull: false,
      type: DataTypes.BIGINT(20).UNSIGNED
    },
    name: {
      allowNull: false,
      type: DataTypes.STRING(255)
    },
    target_ammount:{
      allowNull: false,
      type: DataTypes.BIGINT(20)
    },
    current_ammount:{
      allowNull: false,
      type: DataTypes.BIGINT(20)
    },
    goal_duration_id:{
      allowNull: false,
      type: DataTypes.BIGINT(20)
    },
    goal_category_id:{
      allowNull: false,
      type: DataTypes.BIGINT(20)
    },
    desciption:{
      allowNull: true,
      type: DataTypes.TEXT
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE
    }
  }, {
    sequelize,
    modelName: 'goals',
  });
  return goals;
};