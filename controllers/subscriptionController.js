const RequestError = require('../utils/customError')

const subscriptionService = require('../services/followshipService')

const subscriptionController = {
  addSubscription: async (req, res, next) => {
    const subscriptionReq = { SubscriberId: req.user.id, PublisherId: req.body.id }
    try {
      if (subscriptionReq.SubscriberId === +subscriptionReq.PublisherId) throw new RequestError('You cannot follow yourself.')

      const data = await subscriptionService.addSubscription(subscriptionReq)
      return res.json(data)
    } catch (error) {
      next(error)
    }
  },

  unSubscription: async (req, res, next) => {
    const subscriptionReq = { SubscriberId: req.user.id, PublisherId: req.params.followingId }
    try {
      const data = await subscriptionService.unSubscription(subscriptionReq)
      return res.json(data)
    } catch (error) {
      next(error)
    }
  }
}

module.exports = subscriptionController
