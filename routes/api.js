const express = require('express')

const router = express.Router()
const Question = require('../models/question')

router.get('/questions', (_req, res) => {
  Question.find({}, (err, questions) => {
    if (err) {
      res.send('cannot get questions')
    } else {
      res.send(questions)
    }
  })
})

router.post('/questions/add', async (req, res) => {
  const { questionText, author } = req.body

  try {
    await Question.create({ questionText, author })
    res.send('this question is created successfully')
  } catch (err) {
    res.send('failure occurs when creating a question')
  }
})

router.post('/questions/answer', async (req, res) => {
  const { _id, answer } = req.body

  try {
    await Question.findOneAndUpdate({ _id }, { answer })
    res.send('question answer was updated')
  } catch (err) {
    res.send('failure occurs when updating question')
  }
})

module.exports = router
