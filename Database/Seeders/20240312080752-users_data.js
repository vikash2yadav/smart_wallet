'use strict';

/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up (queryInterface, Sequelize) {
    const users = [
      {
        first_name: "Ralph",
        last_name: "Adam",
        username: "ralph_adam",
        birth_date: "1984-10-26",
        gender: "male",
        email: "ralph@mailinator.com",
        password: "$2b$10$Ku1kgHoY63PoR5LyFsZCvOXvCqHZxPjSsXjXSbtb2janNb46J2KQ2", //123123123
        phone: 6352416987,
        account_type: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        first_name: "John",
        last_name: "Adam",
        username: "john_adam",
        birth_date: "1974-10-20",
        gender: "male",
        email: "john@mailinator.com",
        password: "$2b$10$fbezhkTs/AZxk73JqJchyesTFiBR.xs8OQeF8FQDYTGkIt7smpJ32", //123123123
        phone: 6352417654,
        account_type: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        first_name: "Sunny",
        last_name: "Deol",
        username: "sunny_deol",
        birth_date: "1974-10-20",
        gender: "male",
        email: "sunny@mailinator.com",
        password: "$2b$10$BMGwHY/yy3PslnCClujfYuV62kAtzLA237.kIZvX7UATB3iRbMREO", //123123123
        phone: 63524169874,
        account_type: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    const userInsertedData = users.map(async (user) => {
      return queryInterface.bulkInsert('users', [user], {});
    });

    await Promise.all(userInsertedData);
  },

  async down (queryInterface, Sequelize) {
    return await queryInterface.bulkDelete('users', null, {});
  }
};
