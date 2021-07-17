const express = require('express')
const router = express.Router()

const subscriptionController = require('../../controllers/subscriptionController')

router.post('/', subscriptionController.addSubscription)
router.delete('/:publisherId', subscriptionController.unSubscription)

module.exports = router
