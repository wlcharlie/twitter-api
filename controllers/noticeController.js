const noticeService = require('../services/noticeService')

const noticeController = {
  getNotice: async (req, res, next) => {
    try {
      const data = await noticeService.getNotice(req.user.id)
      return res.json(data)
    } catch (error) {
      next(error)
    }
  }
}

module.exports = noticeController
