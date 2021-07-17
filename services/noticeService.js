const { Notice, NoticeInfo, Tweet, User } = require('../models')

const noticeService = {
  getNotice: async (userId) => {
    return await Notice.findAll({
      where: { SubscriberId: userId },
      include: { model: NoticeInfo, include: [Tweet, User] },
      order: [['createdAt', 'DESC']]
    })
  },

  postNotice: async (ticket) => {
    const noti = await noticeService.postNoticeInfo(ticket.info)

    const arr = Array.from({ length: ticket.SubscribersList.length }, (v, i) => ({
      NoticeInfoId: noti.id,
      PublisherId: ticket.userId,
      SubscriberId: ticket.SubscribersList[i].id
    }))
    console.log(arr)
    await Notice.bulkCreate(arr)
  },

  postNoticeInfo: async (data) => {
    return await NoticeInfo.create({
      objection: data.objection,
      type: data.type,
      UserId: data.userId || null,
      TweetId: data.tweetId || null
    })
  }
}

module.exports = noticeService
