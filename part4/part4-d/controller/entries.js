const jwt = require('jsonwebtoken')
const entriesRouter = require('express').Router()
const Entry = require('../models/entry')
const User = require('../models/user')

// La ruta básica, configurada en la app, sera /api/entries
entriesRouter.get('/', async (req, res) => {
  const entries = await Entry.find({}).populate('user', {password: 0})
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

  if(!(req.token && req.user)) {
    return res.status(400).json({error: 'missing or invalid token'})
  }
  // console.log(req.token, req.user)
  // const verifiedToken = jwt.verify(req.token, process.env.SECRET)

  // if(!req.token || !verifiedToken) {
  //   return res.status(401).json({error: 'token missing or invalid'})
  // }

  // if(!body.title || !body.url) {
  //   res.status(400).end()
  // }

  const user = await User.findById(req.user)

  const newEntry = new Entry({
    author: body.author,
    title: body.title,
    url: body.url,
    likes: body.likes || 0,
    user: req.user || null
  })

  const savedEntry = await newEntry.save()

  user.entries = user.entries.concat(savedEntry._id)
  await user.save()

  const savedAndFormattedEntry = await savedEntry.toJSON()
  res.status(201).json(savedAndFormattedEntry)
})

entriesRouter.delete('/:id', async (req, res) => {
  const id = req.params.id

  const entry = await Entry.findById(id)

  // console.log(req.user, entry.user.toString())
  // const token = jwt.verify(req.token, process.env.SECRET)

  // console.log(entry.user.toString())
  // no hace falta porque se comprueba en el middleware
  // if(!token) {
  //   return res.status(401).send({error: 'token missing or invalid'})
  // } else
  if (!entry) {
    return res.status(404).send({error: 'entry not found'})
  } else if(entry.user.toString() !== req.user) {
    return res.status(403).json({error: 'forbbiden'})
  }

  await Entry.findByIdAndDelete(id)
  res.status(204).end()
  // const deletedEntry = await Entry.findByIdAndDelete(id)
  // deletedEntry
  //   ? res.status(204).end()
  //   : res.status(404).json({'error': 'This blog does not exist in DB'})
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
    : res.status(404).json({error: 'entry not found'})
})

module.exports = entriesRouter