const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const User = require('../models/user')

loginRouter.post('/', async (req, res) => {
  const body = req.body

  const user = await User.findOne({username: body.username})
  const passwordCheck = await bcrypt.compare(body.password, user.password)

  if(!user || !passwordCheck) {
    return res.status(401).json({error: 'invalid user or password'})
  }

  const token = {
    username: user.username,
    id: user._id
  }

  const signToken = jwt.sign(token, process.env.SECRET)
  
  res.status(200).send({signToken, username: user.username, name: user.name})
  // console.log(signToken)

})

module.exports = loginRouter