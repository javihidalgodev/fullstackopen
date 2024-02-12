const jwt = require('jsonwebtoken')
const User = require('../models/user')

const error = (error, req, res, next) => {
  console.log(error.errors)

  if(error.name === 'CastError') {
    return res.status(400).send({error: 'Invalid ID format'})
  } else if (error.name === 'ValidationError') {
    return res.status(400).json({error: error.message})
  } else if (error.name === 'JsonWebTokenError') {
    return res.status(400).json({error: error.message})
  }

  next(error)
}

const getTokenFrom = (req, res, next) => {
  const authorization = req.get('authorization')

  if(authorization && authorization.toLowerCase().startsWith('bearer ')) {
    req.token = authorization.substring(7)
  }
  
  next()
}

const userExtractor = (req, res, next) => {
  const token = req.token

  if(token) {
    const relatedUser = jwt.verify(token, process.env.SECRET)
    req.user = relatedUser.id
    // console.log('userExtractor: ', relatedUser)
  }

  next()
}

module.exports = {
  error,
  getTokenFrom,
  userExtractor
}