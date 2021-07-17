const express = require('express')
const router = express.Router()

const userRoute = require('./userRoute')
const tweetRoute = require('./tweetRoute')
const followshipRoute = require('./followshipRoute')
const subscriptionRoute = require('./subscriptionRoute')
const adminRoute = require('./adminRoute')
const chatRoute = require('./chatRoute')

const userController = require('../../controllers/userController')
const noticeController = require('../../controllers/noticeController')

const { authenticated, checkRole } = require('../../middlewares/auth')

router.post('/signin', userController.signIn)
router.get('/current_user', authenticated, userController.getCurrentUser)
router.get('/notice', authenticated, noticeController.getNotice)

router.use('/users', userRoute)
router.use('/tweets', authenticated, checkRole(), tweetRoute)
router.use('/followships', authenticated, checkRole(), followshipRoute)
router.use('/subscription', authenticated, checkRole(), subscriptionRoute)
router.use('/admin', adminRoute)

router.use('/chat', authenticated, checkRole(), chatRoute)

module.exports = router
