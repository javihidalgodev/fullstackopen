const error = (error, req, res, next) => {
  console.log(error)

  if(error.name = 'CastError') {
    return res.status(400).send({error: 'Invalid ID format'})
  }

  next(error)
}

module.exports = {
  error
}