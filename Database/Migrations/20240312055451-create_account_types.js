'use strict';

/** @type {import('sequelize-cli').Migration} */
const { STATUS } = require('../../Config/constant');

module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('account_types', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.BIGINT(20).UNSIGNED
			},
			type: {
				allowNull: false,
				type: Sequelize.STRING(255)
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE
			}
		});
	},
	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable('account_types');
	}
};