const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

// Esquema
const entrySchema = new mongoose.Schema({
  author: {
    type: String,
    required: true,
    minlength: 3
  },
  title:  {
    type: String,
    required: true,
    minlength: 3
  },
  url: {
    type: String,
    required: true,
    minlength: 5
  },
  rate: {type: Number}
})

entrySchema.plugin(uniqueValidator)

entrySchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Entry', entrySchema, 'entries')