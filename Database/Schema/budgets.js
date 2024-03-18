'use strict';
const {
  Model
} = require('sequelize');
const { STATUS } = require('../../Config/constant');
module.exports = (sequelize, DataTypes) => {
  class budgets extends Model {
    static associate(models) {
      // define association here
    }
  }
  budgets.init({
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
    start_date:{
      allowNull: false,
      type: DataTypes.DATE
    },
    end_date: {
      allowNull: false,
      type: DataTypes.DATE
    },
    purpose:{
      allowNull: false,
      type: DataTypes.STRING(255)
    },
    status: {
      allowNull: false,
      type: DataTypes.TINYINT(1),
      defaultValue: STATUS?.ACTIVE,
      comment: "0 => In Active 1 => Active"
  },
  is_delete: {
      allowNull: false,
      type: DataTypes.TINYINT(1),
      defaultValue: STATUS?.NOTDELETED,
      comment: "0 => Not Deleted 1 => Deleted"
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
    modelName: 'budgets',
  });
  return budgets;
};