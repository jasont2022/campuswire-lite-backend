const express = require('express')

const router = express.Router()
const User = require('../models/user')
const isAuthenticated = require('../middlewares/isAuthenticated')

router.post('/', (req, res) => {
  const { username } = req.session

  res.send(`${username} is logged in`)
})

router.post('/signup', async (req, res, next) => {
  const { username, password } = req.body

  try {
    await User.create({ username, password })
    res.send('this user is created successfully')
  } catch (err) {
    next(err)
  }
})

router.post('/login', (req, res, next) => {
  const { username, password } = req.body

  User.findOne({ username, password }, (err, user) => {
    if (user) {
      req.session.username = username
      req.session.password = password
      res.send(`${username} is logged in`)
    } else {
      next(err)
    }
  })
})

router.post('/logout', isAuthenticated, (req, res) => {
  req.session.username = ''

  res.send('user logged out')
})

module.exports = router
