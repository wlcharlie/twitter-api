const { Subscription } = require('../models')

const RequestError = require('../utils/customError')

const subscriptionService = {
  addSubscription: async (subscriptionReq) => {
    const [, created] = await Subscription.findOrCreate({ where: subscriptionReq })
    if (!created) {
      throw new RequestError('there is a same Subscription found before create')
    }
    return { status: 'success', message: 'A Subscription has created' }
  },

  unSubscription: async (subscriptionReq) => {
    await Subscription.destroy({ where: subscriptionReq })
    return { status: 'success', message: 'A Subscription has destroy' }
  }
}

module.exports = subscriptionService
