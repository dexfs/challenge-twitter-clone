'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.addIndex('posts', ['user_id'], {
      name: 'idx_user_id',
    });
    await queryInterface.addIndex('posts', ['created_at'], {
      name: 'idx_created_at',
    });
    await queryInterface.addIndex('posts', ['user_id', 'created_at'], {
      name: 'idx_user_posts',
    });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.removeIndex('posts', 'idx_user_id');
    await queryInterface.removeIndex('posts', 'idx_created_at');
    await queryInterface.removeIndex('posts', 'idx_user_posts');
  },
};
