'use strict'
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    name: DataTypes.STRING,
    avatar: { type: DataTypes.STRING, defaultValue: 'https://image.flaticon.com/icons/png/512/847/847969.png' },
    introduction: DataTypes.STRING,
    role: { type: DataTypes.STRING, defaultValue: 'user' },
    account: DataTypes.STRING,
    cover: { type: DataTypes.STRING, defaultValue: 'https://images.unsplash.com/27/perspective.jpg?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80' },
    isFollowed: {
      type: DataTypes.VIRTUAL,
      get: function() {
        return !!this.getDataValue('isFollowed')
      }
    },
    isSubscribe: {
      type: DataTypes.VIRTUAL,
      get: function() {
        return !!this.getDataValue('isSubscribe')
      }
    }
  }, {})
  User.associate = function(models) {
    User.hasMany(models.Tweet)
    User.hasMany(models.Reply)
    User.hasMany(models.Like)
    User.hasMany(models.Chat)
    User.hasMany(models.Member)
    User.hasMany(models.Notice, { foreignKey: 'SubscriberId' })
    User.hasMany(models.Notice, { foreignKey: 'PublisherId' })
    User.hasMany(models.NoticeInfo)

    User.belongsToMany(User, {
      through: models.Subscription,
      foreignKey: 'SubscriberId',
      as: 'Publishers'
    })

    User.belongsToMany(User, {
      through: models.Subscription,
      foreignKey: 'PublisherId',
      as: 'Subscribers'
    })

    User.belongsToMany(User, {
      through: models.Followship,
      foreignKey: 'followingId',
      as: 'Followers'
    })

    User.belongsToMany(User, {
      through: models.Followship,
      foreignKey: 'followerId',
      as: 'Followings'
    })
  }
  return User
}
