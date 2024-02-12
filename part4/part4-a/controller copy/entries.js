const entriesRouter = require('express').Router()
const Entry = require('../models/entry')

// La ruta básica, configurada en la app, sera /api/entries

entriesRouter.get('/', (req, res) => {
  Entry.find({})
    .then(entries => res.json(entries))
})

entriesRouter.get('/:id', (req, res) => {
  const id = req.params.id
  
  Entry.findById(id)
    .then(entry => {
      entry
        ? res.json(entry)
        : res.json({'error': 'No results'})
    })
    .catch(error => res.json({'error': 'Malformatted ID'}))
})

entriesRouter.post('/', (req, res) => {
  const body = req.body

  const newEntry = new Entry({
    author: body.author,
    title: body.title,
    url: body.url
  })

  newEntry.save()
    .then(savedEntry => savedEntry.toJSON())
    .then(savedAndFormattedEntry => {
      res.status(201).json(savedAndFormattedEntry)
    })
})

entriesRouter.delete('/:id', (req, res) => {
  const id = req.params.id

  Entry.findByIdAndDelete(id)
    .then(deletedEntry => deletedEntry ? res.json(deletedEntry) : res.json({'error': 'No results'}))
    .catch(error => res.json({'error': error.message}))
})

module.exports = entriesRouter