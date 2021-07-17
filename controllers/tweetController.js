const tweetService = require('../services/tweetService')
const noticeService = require('../services/noticeService')
const RequestError = require('../utils/customError')
const ticketPacking = require('../utils/ticketPacking')

const tweetController = {
  getTweets: async (req, res, next) => {
    try {
      const data = await tweetService.getTweets(req.user.id)
      return res.json(data)
    } catch (error) {
      next(error)
    }
  },

  getTweetsForAdmin: async (req, res, next) => {
    try {
      const data = await tweetService.getTweetsForAdmin()
      return res.json(data)
    } catch (error) {
      next(error)
    }
  },

  postTweet: async (req, res, next) => {
    try {
      const { description } = req.body

      if (!description.trim().length || description.trim().length > 140) throw new RequestError('Invalid tweet.')

      const postData = {
        UserId: req.user.id,
        description
      }
      const data = await tweetService.postTweet(postData)
      const ticket = await ticketPacking('tweets', 'new', data.tweetId, req.user.Subscribers, req.user.id)
      await noticeService.postNotice(ticket)
      return res.json(data)
    } catch (error) {
      next(error)
    }
  },

  getTweet: async (req, res, next) => {
    try {
      const data = await tweetService.getTweet(req.user.id, req.params.tweet_id)
      return res.json(data)
    } catch (error) {
      next(error)
    }
  },

  getTweetAndReplies: async (req, res, next) => {
    try {
      const data = await tweetService.getTweetAndReplies(req.params.tweet_id)
      return res.json(data.Replies)
    } catch (error) {
      next(error)
    }
  },

  postReply: async (req, res, next) => {
    try {
      const { comment } = req.body

      if (!comment.trim().length || comment.trim().length > 140) throw new RequestError('Invalid comment.')

      const replyData = {
        UserId: req.user.id,
        TweetId: req.params.tweet_id,
        comment
      }
      const data = await tweetService.postReply(replyData)
      // TODO第四個參數要帶回覆之貼文的userID(貼文作者)
      const ticket = await ticketPacking('tweets', 'replied', data.tweetId, [{ id: 123 }], req.user.id)
      await noticeService.postNotice(ticket)
      return res.json(data)
    } catch (error) {
      next(error)
    }
  },

  likeTweet: async (req, res, next) => {
    try {
      const likeData = {
        UserId: req.user.id,
        TweetId: req.params.tweet_id
      }
      const data = await tweetService.likeTweet(likeData)
      // TODO第四個參數要帶喜歡之貼文的userID(貼文作者)
      const ticket = await ticketPacking('tweets', 'liked', data.tweetId, [{ id: 123 }], req.user.id)
      await noticeService.postNotice(ticket)
      return res.json(data)
    } catch (error) {
      next(error)
    }
  },

  unlikeTweet: async (req, res, next) => {
    try {
      const likeData = {
        UserId: req.user.id,
        TweetId: req.params.tweet_id
      }
      const data = await tweetService.unlikeTweet(likeData)
      return res.json(data)
    } catch (error) {
      next(error)
    }
  }
}

module.exports = tweetController
