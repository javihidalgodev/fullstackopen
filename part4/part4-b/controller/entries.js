const entriesRouter = require('express').Router()
const Entry = require('../models/entry')

// La ruta básica, configurada en la app, sera /api/entries

entriesRouter.get('/', async (req, res) => {
  const entries = await Entry.find({})
  res.json(entries)
})

entriesRouter.get('/:id', async (req, res) => {
  const id = req.params.id
  
  const entry = await Entry.findById(id)
  
  entry
    ? res.json(entry)
    : res.json({'error': 'No results'})
})

entriesRouter.post('/', async (req, res) => {
  const body = req.body

  if(!body.title || !body.url) {
    res.status(400).end()
  }

  const newEntry = new Entry({
    author: body.author,
    title: body.title,
    url: body.url,
    likes: body.likes || 0
  })

  const savedEntry = await newEntry.save()
  const savedAndFormattedEntry = await savedEntry.toJSON()
  res.status(200).json(savedAndFormattedEntry)
})

entriesRouter.delete('/:id', async (req, res) => {
  const id = req.params.id

  const deletedEntry = await Entry.findByIdAndDelete(id)

  deletedEntry
    ? res.status(204).end()
    : res.status(404).json({'error': 'This blog does not exist in DB'})
})

entriesRouter.put('/:id', async (req, res) => {
  const id = req.params.id
  const body = req.body

  const newBlog = {
    author: body.author,
    title: body.title,
    url: body.url,
    likes: body.likes
  }

  const updatedNote = await Entry.findByIdAndUpdate(id, newBlog, {new: true})

  updatedNote
    ? res.json(updatedNote)
    : res.status(404).json({error: 'Entry not found'})
})

module.exports = entriesRouter