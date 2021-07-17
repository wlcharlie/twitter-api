'use strict'
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('NoticeInfos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      objection: {
        type: Sequelize.ENUM,
        values: ['tweets', 'users']
      },
      type: {
        type: Sequelize.ENUM,
        values: ['new', 'liked', 'followed', 'replied']
      },
      UserId: {
        type: Sequelize.INTEGER
      },
      TweetId: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    })
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('NoticeInfos')
  }
}
