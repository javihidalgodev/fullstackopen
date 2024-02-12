const config = require('./utils/config')
const middleware = require('./utils/middleware')

const express = require('express')
require('express-async-errors')
const app = express()

const cors = require('cors')
const loginRouter = require('./controller/login')
const entriesRouter = require('./controller/entries')
const usersRouter = require('./controller/users')

const mongoose = require('mongoose')

console.log(`Connecting to MongoDB`)

mongoose.connect(config.MONGODB_URI)
  .then(db => {
    console.log(`Connected to MongoDB`)
  })
  .catch(error => {
    console.error('Error connecting to MongoDB:', error.message)
  })

app.use(cors())
app.use(express.static('dist'))
app.use(express.json())
// app.use(loggers)
app.use(middleware.getTokenFrom)
app.use('/api/login', loginRouter)
app.use('/api/entries', middleware.userExtractor, entriesRouter)
app.use('/api/users', usersRouter)
// app.use(uep)
app.use(middleware.error)

module.exports = app