'use strict';
const users = [
  {
    id: '4cfe67a9-defc-42b9-8410-cb5086bec2f5',
    username: 'alucard',
    created_at: new Date(),
  },
  {
    id: 'b8903f77-5d16-4176-890f-f597594ff952',
    username: 'anderson',
    created_at: new Date(),
  },
  {
    id: '75135a97-46be-405f-8948-0821290ca83e',
    username: 'seras_victoria',
    created_at: new Date(),
  },
];
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert('users', users, {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete(
      'users',
      users.map((u) => u.id),
      {},
    );
  },
};
