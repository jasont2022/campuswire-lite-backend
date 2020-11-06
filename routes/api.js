const express = require('express')

const router = express.Router()
const Question = require('../models/question')
const isAuthenticated = require('../middlewares/isAuthenticated')

router.get('/questions', (_req, res, next) => {
  Question.find({}, (err, questions) => {
    if (err) {
      next(err)
    } else {
      res.send(questions)
    }
  })
})

router.post('/questions/add', isAuthenticated, async (req, res, next) => {
  const { questionText } = req.body
  const { username } = req.session
  const author = username

  try {
    await Question.create({ questionText, author })
    res.send('this question is created successfully')
  } catch (err) {
    next(err)
  }
})

router.post('/questions/answer', isAuthenticated, async (req, res, next) => {
  const { _id, answer } = req.body

  try {
    await Question.findOneAndUpdate({ _id }, { answer })
    res.send('question answer was updated')
  } catch (err) {
    next(err)
  }
})

module.exports = router
