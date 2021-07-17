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
      NoticeInfo.belongsTo(models.Notice)
    }
  };
  NoticeInfo.init({
    objection: DataTypes.ENUM,
    type: DataTypes.ENUM,
    UserId: DataTypes.INTEGER,
    TweetId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'NoticeInfo'
  })
  return NoticeInfo
}
