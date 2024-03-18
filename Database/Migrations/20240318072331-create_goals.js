'use strict';

/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('goals', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT(20).UNSIGNED
      },
      user_id:{
        allowNull: false,
        type: Sequelize.BIGINT(20).UNSIGNED
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING(255)
      },
      target_ammount:{
        allowNull: false,
        type: Sequelize.BIGINT(20)
      },
      current_ammount:{
        allowNull: false,
        type: Sequelize.BIGINT(20)
      },
      goal_duration_id:{
        allowNull: false,
        type: Sequelize.BIGINT(20)
      },
      goal_category_id:{
        allowNull: false,
        type: Sequelize.BIGINT(20)
      },
      desciption:{
        allowNull: true,
        type: Sequelize.TEXT
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
    await queryInterface.dropTable('goals');
  }
};