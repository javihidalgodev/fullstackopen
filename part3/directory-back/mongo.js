const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

if (process.argv.length < 3) {
  console.log('Please provide the password as an argument: node mongo.js <password>')
  process.exit(1)
}

const password = process.argv[2]
// console.log(process.argv[3])

const url = `mongodb+srv://javihidalgodev:${password}@cluster0.kutry4o.mongodb.net/directory-app?retryWrites=true&w=majority`

mongoose.connect(url)

// Esquema
const personSchema = new mongoose.Schema({
  name: {type: String, required: true, unique: true},
  number: {type: Number, required: true}
})

personSchema.plugin(uniqueValidator)

// Modelo
const Person = mongoose.model('Person', personSchema)

// person.save().then(res => {
//   console.log(res)

//   //Cerrar la conexión en este punto es importante
//   mongoose.connection.close()
// })

if(process.argv[3]) {
  const person = new Person({
    name: `${process.argv[3]}`,
    number: `${process.argv[4]}`
  })

  person.save().then(res => {
  console.log(res)

  //Cerrar la conexión en este punto es importante
  mongoose.connection.close()
})
} else {
  Person.find({}).then(res => {
    console.log('Phonebook:')
    res.forEach(person => {
      console.log(`${person.name}: ${person.number}`)
    })

    mongoose.connection.close()
  })
}
