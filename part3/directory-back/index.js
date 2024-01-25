require('dotenv').config()
const express = require('express')
const cors = require('cors')
const app = express()
const PORT = process.env.PORT
const Person = require('./models/person')

app.use(express.json())
app.use(cors())
app.use(express.static('dist'))

// let numbers = [
//   {
//     "id": "c23c",
//     "name": "Víctor",
//     "number": "963"
//   },
//   {
//     "id": "19f0",
//     "name": "Ana",
//     "number": "741"
//   },
//   {
//     "id": "3485",
//     "name": "Mercedes",
//     "number": "852"
//   },
//   {
//     "id": "3ceb",
//     "name": "Andrés",
//     "number": "963"
//   },
//   {
//     "id": "e03b",
//     "name": "Marcus",
//     "number": "951"
//   },
//   {
//     "id": "f8b7",
//     "name": "Marc",
//     "number": "987"
//   },
//   {
//     "id": "29f0",
//     "name": "Sol",
//     "number": "789"
//   },
//   {
//     "id": "06fd",
//     "name": "eRIK",
//     "number": "456"
//   },
//   {
//     "id": "1fe6",
//     "name": "Riah",
//     "number": "123"
//   },
//   {
//     "id": "04c0",
//     "name": "Manel",
//     "number": "456"
//   },
//   {
//     "id": "8133",
//     "name": "Natalia",
//     "number": "789"
//   },
//   {
//     "id": "8ad2",
//     "name": "Mariona",
//     "number": "456"
//   },
//   {
//     "id": "30fe",
//     "name": "Norman",
//     "number": "456987"
//   }
// ]

// Obtener todos los registros
app.get('/api/persons', (req, res) => {
  Person.find({})
    .then(persons => res.json(persons))
})

app.get('/api/info', (req, res) => {
  const date = new Date()

  Person.countDocuments({})
    .then(count => {
      res.send(`
        <p>Phonebook has info for ${count} people</p>
        <p>${date.toString()}</p>
      `)
    })
    
  // res.send(`
  //   <p>Phonebook has info por ${numbers.length} people</p>
  //   <p>${date.toString()}</p>
  // `)
})

app.get('/api/persons/:id', (req, res, next) => {
  const query = req.params.id

  Person.findById(query)
    .then(person => {
      res.json(person)
    })
    .catch(error => next(error))

  // person
  //   ? res.json(person)
  //   : res.status(404).send('<h1>No se han encontrado registros</h1>').end()
})

// Borrar persona
app.delete('/api/persons/:id', (req, res, next) => {
  const query = req.params.id
  
  Person.findByIdAndDelete(query)
    .then(deletedPerson => {
      deletedPerson !== null
        ? res.status(204).end()
        : res.json({error: 'No existe ese registro en la base de datos'})
    })
    .catch(error => next(error))

  // numbers = numbers.filter(n => n.id !== query)
  // res.status(204).end()
})

// const generateID = () => {
//   return Math.round(Math.random() * 100000)
// }

// Añadir persona
app.post('/api/persons', (req, res, next) => {
  const body = req.body

  if(!body) {
    return res.status(404).json({error: 'Content missing'})
  }

  const newPerson = new Person({
    name: body.name,
    number: body.number
  })

  newPerson.save()
    .then(savedPerson => res.json(savedPerson))
    .catch(error => next(error))

  // if(!body.name || !body.number) {
  //   return res.status(404).json({error: 'La petición debe incluir un nombre y un número para que sea correcta'})
  // } else {
  //   const exist = numbers.some(n => n.name === body.name)

  //   if(exist) {
  //     return res.status(404).json({error: 'Ese nombre ya existe en la agenda'})
  //   }

  //   const newNumber = {
  //     id: `${generateID()}`,
  //     name: body.name,
  //     number: body.number
  //   }

  //   numbers = numbers.concat(newNumber)

  //   res.json(newNumber)
  // }
})

// Actualizar persona
app.put('/api/persons/:id', (req, res, next) => {
  const query = req.params.id
  const body = req.body

  const newPerson = {
    name: body.name,
    number: body.number
  }

  Person.findByIdAndUpdate(query, newPerson, {new: true})
    .then(updatedPerson => {
      updatedPerson
        ? res.json(updatedPerson)
        : res.status(404).end()
    })
    .catch(error => next(error))
})

const unknownEndpoint = (req, res) => {
  res.status(404).send({error: 'No existe el endpoint'})
}
app.use(unknownEndpoint)

const errorHandler = (error, req, res, next) => {
  console.log(error.name)

  if(error.name === 'CastError') {
    return res.status(400).send({error: 'Malformatted id'})
  } else if (error.name === 'ValidationError') {
    return res.status(400).json({error: 'Incorrect format'})
  }

  next(error)
}
app.use(errorHandler)

app.listen(PORT || 2024)
console.log(`Server running on port ${PORT}`)