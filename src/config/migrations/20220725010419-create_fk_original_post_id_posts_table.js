'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     *
     */
    await queryInterface.addConstraint('posts', {
      fields: ['original_post_id'],
      type: 'foreign key',
      name: 'fk_original_post_id_post',
      references: {
        table: 'posts',
        field: 'id',
      },
    });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.removeConstraint('posts', 'fk_original_post_id_post');
  },
};
