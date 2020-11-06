/* eslint-disable no-console */
const express = require('express')
const mongoose = require('mongoose')
const cookieSession = require('cookie-session')

const app = express()

const AccountRouter = require('./routes/account')
const QuestionRouter = require('./routes/api')

const MONGO_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/campuswire-lite'

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
})

app.use(express.json())

app.use(
  cookieSession({
    name: 'local-session',
    keys: ['spooky'],
    maxAge: 26 * 60 * 60 * 1000, // 24 hours
  }),
)

app.use('/account', AccountRouter)
app.use('/api', QuestionRouter)

app.use((err, _req, res, _next) => {
  console.log(err.stack)
  res.status(500).send(`${err}`)
})

app.listen(3000, () => {
  console.log('listening to 3000')
})
