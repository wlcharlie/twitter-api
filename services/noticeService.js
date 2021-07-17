const { Notice, NoticeInfo } = require('../models')

const noticeService = {
  getNotice: async (userId) => {
    return await Notice.findAll({
      where: { SubscriberId: userId },
      include: NoticeInfo
    })
  },

  postNotice: async () => {

  }
}

module.exports = noticeService
