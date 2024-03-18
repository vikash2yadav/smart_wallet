'use strict';
const {
	Model
} = require('sequelize');
const { STATUS } = require('../../Config/constant');
module.exports = (sequelize, DataTypes) => {
	class account_types extends Model {
		static associate(models) {
			// define association here
		}
	}
	account_types.init({
		id: {
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
			type: DataTypes.BIGINT(20).UNSIGNED
		},
		type: {
			allowNull: false,
			type: DataTypes.STRING(255)
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
		modelName: 'account_types',
	});
	return account_types;
};