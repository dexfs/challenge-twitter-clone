'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    return queryInterface.createTable('posts', {
      id: {
        type: Sequelize.DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
      },
      content: {
        type: Sequelize.DataTypes.TEXT,
      },
      user_id: {
        type: Sequelize.DataTypes.UUID,
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DataTypes.DATE,
      },
      is_quote: {
        type: Sequelize.DataTypes.BOOLEAN,
        allowNull: false,
      },
      is_repost: {
        type: Sequelize.DataTypes.BOOLEAN,
        allowNull: false,
      },
      original_post_id: {
        type: Sequelize.DataTypes.UUID,
        allowNull: true,
      },
      original_post_content: {
        type: Sequelize.DataTypes.TEXT,
        allowNull: true,
      },
      original_post_user_id: {
        type: Sequelize.DataTypes.UUID,
        allowNull: true,
      },
      original_post_screen_name: {
        type: Sequelize.DataTypes.STRING(255),
        allowNull: true,
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
    await queryInterface.dropTable('posts');
  },
};
