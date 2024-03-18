'use strict';
const {
	Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class goal_durations extends Model {
		static associate(models) {
			// define association here
		}
	}
	goal_durations.init({
		id: {
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
			type: DataTypes.BIGINT(20).UNSIGNED
		},
		name: {
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
		modelName: 'goal_durations',
	});
	return goal_durations;
};