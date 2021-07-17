const RequestError = require('../utils/customError')
const ticketPacking = require('../utils/ticketPacking')

const followshipService = require('../services/followshipService')
const noticeService = require('../services/noticeService')

const followshipController = {
  addFollow: async (req, res, next) => {
    const followReq = { followerId: req.user.id, followingId: req.body.id }
    try {
      if (followReq.followerId === +followReq.followingId) throw new RequestError('You cannot follow yourself.')

      const data = await followshipService.addFollow(followReq)
      const ticket = await ticketPacking('users', 'followed', req.user.id, [{ id: req.body.id }], req.user.id)
      await noticeService.postNotice(ticket)
      return res.json(data)
    } catch (error) {
      next(error)
    }
  },

  unFollow: async (req, res, next) => {
    const followReq = { followerId: req.user.id, followingId: req.params.followingId }
    try {
      const data = await followshipService.unFollow(followReq)
      return res.json(data)
    } catch (error) {
      next(error)
    }
  }
}

module.exports = followshipController
