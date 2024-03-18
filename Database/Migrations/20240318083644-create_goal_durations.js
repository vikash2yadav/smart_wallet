'use strict';

/** @type {import('sequelize-cli').Migration} */
const { STATUS } = require('../../Config/constant');

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('goal_durations', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.BIGINT(20).UNSIGNED
            },
            name: {
                allowNull: false,
                type: Sequelize.STRING(255)
            },
            status: {
                allowNull: false,
                type: Sequelize.TINYINT(1),
                defaultValue: STATUS?.ACTIVE,
                comment: "0 => In Active 1 => Active"
            },
            is_delete: {
                allowNull: false,
                type: Sequelize.TINYINT(1),
                defaultValue: STATUS?.NOTDELETED,
                comment: "0 => Not Deleted 1 => Deleted"
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
        await queryInterface.dropTable('goal_durations');
    }
};