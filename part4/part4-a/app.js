const config = require('./utils/config')

const express = require('express')
const app = express()

const cors = require('cors')
const entriesRouter = require('./controller/entries')

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
app.use('/api/entries', entriesRouter)
// app.use(uep)
// app.use(error)

module.exports = app