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

const {
  isLoggedIn,
  isAdmin
} = require('../../../services/auth')

const authRouter = express.Router()

authRouter.post('/register', register)
authRouter.post('/login', login)
authRouter.post('/logout', logout)
authRouter.get('/user', isLoggedIn || isAdmin, getUser)
authRouter.put('/user/:userId', isLoggedIn || isAdmin, updateUserController)
authRouter.put('/user/disable/:userId', isLoggedIn || isAdmin, disableUserController)
authRouter.put('/user/enable/:userId', isLoggedIn || isAdmin, enableUserController)
authRouter.delete('/user/:userId', isLoggedIn || isAdmin, deleteUserController)
authRouter.get('/user/:userId',isLoggedIn || isAdmin, getUserByIdController)
authRouter.get('/user/username/:username',isLoggedIn || isAdmin, getUserByUsernameController)
authRouter.get('/user/email/:email', getUserByEmailController)
authRouter.get('/users', isAdmin, getAllUsersController)

module.exports = authRouter