const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const userService = require('../services/userService')
const tweetService = require('../services/tweetService')

const imgurUpload = require('../utils/imgurUpload')
const RequestError = require('../utils/customError')
const { signUpValidation } = require('../utils/validation')

const userController = {
  signIn: async (req, res, next) => {
    try {
      const { email, password } = req.body

      if (!email || !password) {
        throw new RequestError('Required fields did not exist. (email or password)')
      }
      const user = await userService.signIn(email)
      if (!user) {
        throw new RequestError('No such user found.')
      }

      if (req.baseUrl.includes('admin')) {
        if (user.role !== 'admin') throw new RequestError('User cannot sign in admin page.')
      } else {
        if (user.role === 'admin') throw new RequestError('Admin cannot sign in user page.')
      }

      if (!bcrypt.compareSync(password, user.password)) {
        throw new RequestError('Incorrect password word.')
      }

      const payload = { id: user.id }
      const token = jwt.sign(payload, process.env.JWTSECRET)
      return res.json({
        status: 'success',
        token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role
        }
      })
    } catch (error) {
      return next(error)
    }
  },

  signUp: async (req, res, next) => {
    try {
      signUpValidation(req.body)
      await userService.checkUnique(req.body)

      const hash = bcrypt.hashSync(req.body.password, 10)
      const user = await userService.signUp({
        ...req.body,
        password: hash
      })

      return res.json({
        status: 'success',
        data: user
      })
    } catch (error) {
      return next(error)
    }
  },

  getUser: async (req, res, next) => {
    try {
      const user = await userService.getUser(req.params.user_id, req.user.id)
      return res.json(user)
    } catch (error) {
      return next(error)
    }
  },

  getCurrentUser: async (req, res, next) => {
    try {
      const user = await userService.getUser(req.user.id)
      return res.json(user)
    } catch (error) {
      return next(error)
    }
  },

  putUser: async (req, res, next) => {
    try {
      const { password, checkPassword, email } = req.body

      if (req.user.id !== parseInt(req.params.user_id)) {
        throw new RequestError('Can only edit your own profile.')
      }

      if (password) {
        if (password !== checkPassword) throw new RequestError('Field password & checkPassword must be same.')
        req.body.password = bcrypt.hashSync(password, 10)
      }

      if (email && !email.match(/.+@.+\..+/i)) {
        throw new RequestError('Invalid email.')
      }
      await userService.checkUnique(req.body, req.params.user_id)

      const { files } = req
      if (files) {
        if (files.avatar) {
          const [avatarData] = files.avatar
          const avatar = await imgurUpload(avatarData.path)
          req.body.avatar = avatar
        }
        if (files.cover) {
          const [coverData] = files.cover
          const cover = await imgurUpload(coverData.path)
          req.body.cover = cover
        }
      }

      const user = await userService.putUser(req.params.user_id, { ...req.body })
      return res.json({ status: 'success', user })
    } catch (error) {
      return next(error)
    }
  },

  getTweets: async (req, res, next) => {
    try {
      const tweets = await tweetService.getTweets(req.user.id, {
        UserId: req.params.user_id
      })
      return res.json(tweets)
    } catch (error) {
      return next(error)
    }
  },

  getReplies: async (req, res, next) => {
    try {
      const tweets = await tweetService.getAllRepliesFromUser(req.params.user_id)
      return res.json(tweets)
    } catch (error) {
      return next(error)
    }
  },

  getFollowings: async (req, res, next) => {
    try {
      const followings = await userService.getFollowings(req.params.user_id, req.user.id)
      return res.json(followings)
    } catch (error) {
      return next(error)
    }
  },

  getFollowers: async (req, res, next) => {
    try {
      const followers = await userService.getFollowers(req.params.user_id, req.user.id)
      return res.json(followers)
    } catch (error) {
      return next(error)
    }
  },

  getTopUsers: async (req, res, next) => {
    try {
      const topUsers = await userService.getTopUsers(req.user.id)
      return res.json({ status: 'success', topUsers })
    } catch (error) {
      return next(error)
    }
  },

  getLikes: async (req, res, next) => {
    try {
      const likes = await userService.getLikes(req.params.user_id)
      return res.json(likes)
    } catch (error) {
      return next(error)
    }
  }
}

module.exports = userController
