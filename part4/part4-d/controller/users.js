const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')
const Entry = require('../models/entry')

usersRouter.get('/', async (req, res) => {
  const users = await User.find({}, {password: 0}).populate('entries', {likes: 0, user: 0})

  res.json(users)
})

usersRouter.post('/', async (req, res) => {
  const body = req.body

  if(!(body.password && body.username)) {
    return res.status(400).json({error: 'username and password are required'})
  } else if (body.password.length < 3) {
    return res.status(400).json({error: 'user validation failed. Password should be at least 3 characters'})
  }
  
  const passwordHash = await bcrypt.hash(body.password, 10)

  const newUser = new User({
    username: body.username,
    name: body.name,
    password: passwordHash,
    entries: []
  })

  const savedUser = await newUser.save()
  res.json(savedUser)

})

module.exports = usersRouter