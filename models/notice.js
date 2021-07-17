'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Notice extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      Notice.belongsTo(models.User, { foreignKey: 'SubscriberId' })
      Notice.belongsTo(models.User, { foreignKey: 'PublisherId' })
      Notice.belongsTo(models.NoticeInfo)
    }
  }
  Notice.init({
    NoticeInfoId: DataTypes.INTEGER,
    PublisherId: DataTypes.INTEGER,
    SubscriberId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Notice'
  })
  return Notice
}
