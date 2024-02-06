const jwt = require('jsonwebtoken')
const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

// La ruta básica, configurada en la app, sera /api/blogs
blogsRouter.get('/', async (req, res) => {
  const blogs = await Blog.find({}).populate('user', {password: 0, blogs: 0})
  res.json(blogs)
})

blogsRouter.get('/:id', async (req, res) => {
  const id = req.params.id
  
  const blog = await Blog.findById(id)
  
  blog
    ? res.json(blog)
    : res.json({'error': 'No results'})
})

blogsRouter.post('/', async (req, res) => {
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

  const newBlog = new Blog({
    author: body.author,
    title: body.title,
    url: body.url,
    likes: body.likes || 0,
    user: req.user || null
  })

  const savedBlog = await newBlog.save()

  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  const savedAndFormattedBlog = await savedBlog.toJSON()
  res.status(201).json(savedAndFormattedBlog)
})

blogsRouter.delete('/:id', async (req, res) => {
  const id = req.params.id

  const blog = await Blog.findById(id)

  // console.log(req.user, blog.user.toString())
  // const token = jwt.verify(req.token, process.env.SECRET)

  // console.log(blog.user.toString())
  // no hace falta porque se comprueba en el middleware
  // if(!token) {
  //   return res.status(401).send({error: 'token missing or invalid'})
  // } else
  if (!blog) {
    return res.status(404).send({error: 'blog not found'})
  } else if(blog.user.toString() !== req.user) {
    return res.status(403).json({error: 'forbbiden'})
  }

  await Blog.findByIdAndDelete(id)
  res.status(204).end()
  // const deletedBlog = await Blog.findByIdAndDelete(id)
  // deletedBlog
  //   ? res.status(204).end()
  //   : res.status(404).json({'error': 'This blog does not exist in DB'})
})

blogsRouter.put('/:id', async (req, res) => {
  const id = req.params.id
  const body = req.body

  const newBlog = {
    author: body.author,
    title: body.title,
    url: body.url,
    likes: body.likes
  }

  const updatedNote = await Blog.findByIdAndUpdate(id, newBlog, {new: true})

  updatedNote
    ? res.json(updatedNote)
    : res.status(404).json({error: 'blog not found'})
})

module.exports = blogsRouter