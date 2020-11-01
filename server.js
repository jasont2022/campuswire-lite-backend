/* eslint-disable no-console */
const express = require('express')
const mongoose = require('mongoose')
// const cookieSession = require('cookie-session')

const app = express()

// const UserRouter = require('./routes/user')
// const QuestionRouter = require('./routes/question')

const MONGO_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/test2'

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

app.use(express.json())

app.listen(3000, () => {
  console.log('listening to 3000')
})
