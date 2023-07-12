const express = require('express')
const {
  register,
  login,
  logout,
  getUser,
  updateUserController,
  disableUserController,
  enableUserController,
  deleteUserController,
  getUserByIdController,
  getUserByUsernameController,
  getUserByEmailController,
  getAllUsersController
} = require('./auth.controller')

const authRouter = express.Router()

authRouter.post('/register', register)
authRouter.post('/login', login)
authRouter.post('/logout', logout)
authRouter.get('/user', getUser)
authRouter.put('/user/:userId', updateUserController)
authRouter.put('/user/disable/:userId', disableUserController)
authRouter.put('/user/enable/:userId', enableUserController)
authRouter.delete('/user/:userId', deleteUserController)
authRouter.get('/user/:userId', getUserByIdController)
authRouter.get('/user/username/:username', getUserByUsernameController)
authRouter.get('/user/email/:email', getUserByEmailController)
authRouter.get('/users', getAllUsersController)

module.exports = authRouter