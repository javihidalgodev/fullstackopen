require('dotenv').config()
const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const url = process.env.MONGODB_URI
console.log('Connecting to ', url)

mongoose.connect(url)
  .then(res => console.log('Connected to MongoDB'))
  .catch(error => console.log('Error connecting to MongoDB: ', error.message))

console.log('Welcome to MongoDB')

// Definiciones

// Esquema
const personSchema = new mongoose.Schema({
  name: {type: String, required: true, unique: true, minLength: 3},
  number: {type: String, required: true, minLength: 8}
})

personSchema.plugin(uniqueValidator)

// Formateo del JSON
personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

// Modelo y export
module.exports = mongoose.model('Person', personSchema)