const { Notice, NoticeInfo } = require('../models')

const noticeService = {
  getNotice: async (userId) => {
    return await Notice.findAll({
      where: { SubscriberId: userId },
      include: NoticeInfo
    })
  },

  postNotice: async (ticket) => {
    const notiId = await noticeService.postNoticeInfo(ticket.info)

    const arr = Array.from({ length: ticket.SubscribersList.length }, (v, i) => ({
      NoticeInfoId: notiId,
      PublisherId: ticket.userId,
      SubscriberId: ticket.SubscribersList[i].id
    }))

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
