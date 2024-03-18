'use strict';
const {
	Model
} = require('sequelize');
const { STATUS, USER_ACCOUNT_TYPE, CURRENCY } = require('../../Config/constant');
module.exports = (sequelize, DataTypes) => {
	class users extends Model {
		static associate(models) {
			// define association here
		}
	}
	users.init({
		id: {
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
			type: DataTypes.BIGINT(20).UNSIGNED
		},
		first_name: {
			allowNull: false,
			type: DataTypes.STRING(255),
			set(val) {
				this.setDataValue('first_name', val.toLowerCase().replace(/(^\w{1})|(\s{1}\w{1})/g, match => match.toUpperCase()));
			},
		},
		last_name: {
			allowNull: false,
			type: DataTypes.STRING(255),
			set(val) {
				this.setDataValue('last_name', val.toLowerCase().replace(/(^\w{1})|(\s{1}\w{1})/g, match => match.toUpperCase()));
			},
		},
		email: {
			allowNull: false,
			type: DataTypes.STRING(255)
		},
		username: {
			allowNull: false,
			type: DataTypes.STRING(255)
		},
		password: {
			allowNull: false,
			type: DataTypes.STRING(255)
		},
		birth_date: {
			allowNull: false,
			type: DataTypes.DATE
		},
		profile_image: {
			allowNull: true,
			type: DataTypes.STRING(500)
		},
		gender: {
			allowNull: false,
			type: DataTypes.STRING(255)
		},
		phone: {
			allowNull: false,
			type: DataTypes.STRING(255)
		},
		currency: {
			allowNull: true,
			type: DataTypes.STRING(500),
			defaultValue: CURRENCY?.RUPEE
		},
		alternative_phone: {
			allowNull: true,
			type: DataTypes.STRING(255)
		},
		address: {
			allowNull: true,
			type: DataTypes.TEXT
		},
		account_type: {
			allowNull: false,
			type: DataTypes.TINYINT(1),
			defaultValue: USER_ACCOUNT_TYPE?.PUBLIC,
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
		modelName: 'users',
	});
	return users;
};