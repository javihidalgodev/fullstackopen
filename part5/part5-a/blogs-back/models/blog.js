const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

// Esquema
const blogSchema = new mongoose.Schema({
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
  likes: {type: Number},
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
})

blogSchema.plugin(uniqueValidator)

blogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Blog', blogSchema, 'blogs')