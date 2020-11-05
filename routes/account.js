const express = require('express')

const router = express.Router()
const User = require('../models/user')

router.post('/', (req, res) => {
  const { username } = req.session

  res.send(`${username} is logged in`)
})

router.post('/signup', async (req, res) => {
  const { username, password } = req.body

  try {
    await User.create({ username, password })
    res.send('this user is created successfully')
  } catch (err) {
    console.log(err)
    res.send('failure occurs when creating user')
  }
})

router.post('/login', (req, res) => {
  const { username, password } = req.body

  User.findOne({ username, password }, (err, user) => {
    if (user) {
      req.session.username = username
      req.session.password = password
      res.send(`${username} is logged in`)
    } else {
      console.log(err)
      res.send('unsuccessful login')
    }
  })
})

router.post('/logout', (req, res) => {
  req.session.username = ''

  res.send('user logged out')
})

module.exports = router
