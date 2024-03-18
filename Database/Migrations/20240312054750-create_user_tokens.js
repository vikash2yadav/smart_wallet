'use strict';

/** @type {import('sequelize-cli').Migration} */
const { STATUS } = require('../../Config/constant');

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('user_tokens', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.BIGINT(20).UNSIGNED
            },
            access_token: {
                allowNull: false,
                type: Sequelize.STRING(500)
            },
            user_id: {
                allowNull: false,
                type: Sequelize.BIGINT(20).UNSIGNED
            },
            status: {
                allowNull: false,
                type: Sequelize.TINYINT(1),
                defaultValue: STATUS?.ACTIVE,
                comment: "0 => In Active 1 => Active"
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
        await queryInterface.dropTable('user_tokens');
    }
};