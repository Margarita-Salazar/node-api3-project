const User = require('../users/users-model')

function logger(req, res, next) {
  // DO YOUR MAGIC
  req.timeStamp = new Date()
  console.log(`${req.method}, ${req.baseUrl}, and ${req.timeStamp}`)
  next()
}

async function validateUserId(req, res, next) {
  // DO YOUR MAGIC
  try{
    const user = await User.getById(req.params.id)
    if(user){
      req.user = user
      next()
    }else{
      res.status(404).json(({
        message: 'user not found'
      }))
    }

  }catch(err){
    next(err)
  }
}

function validateUser(req, res, next) {
  const { name } = req.body
  if(
      !name || 
      !name.trim()
    ){
      res.status(400).json({
        message: 'missing required name field'
      })
    }else{
      next()
    }
}

function validatePost(req, res, next) {
  const { text } = req.body
  if(
    !text || 
    !text.trim()
  ){
    res.status(400).json({
      message: 'missing required text field'
    })
  }else{
    next()
  }
}

// do not forget to expose these functions to other modules
module.exports = {
  logger,
  validateUserId,
  validateUser,
  validatePost
}