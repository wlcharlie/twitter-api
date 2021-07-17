'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class NoticeInfo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      NoticeInfo.hasMany(models.Notice)
    }
  };
  NoticeInfo.init({
    objection: { type: DataTypes.ENUM, values: ['tweets', 'users'] },
    type: { type: DataTypes.ENUM, values: ['new', 'liked', 'followed', 'replied'] },
    UserId: DataTypes.INTEGER,
    TweetId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'NoticeInfo'
  })
  return NoticeInfo
}
