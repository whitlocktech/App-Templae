const passport = require('../../../services/auth').passport
const generateToken = require('../../../services/auth').generateToken
const User = require('../../../models/users/users.model')

async function register(req, res, next) { 
  const { username, password, email, role } = req.body
  try {
    const user = await User.createUser(username, password, email, role)
    return res.json({ message: 'User created successfully', user })
  } catch (error) { 
    return res.status(500).json({ message: 'Error while registering user', error: error.message })
  }
}

async function login(req, res, next) { 
    passport.authenticate('local', { session: false }, (err, user, info) => { 
    if (err || !user) {
      return res.status(400).json({ message: info.message })
    }
    try {
      const token = generateToken(user)

      return res.json({ token })
    } catch (error) { 
      return res.status(500).json({ message: 'Internal Server Error' })
    }
  })(req, res, next)
}

async function logout(req, res, next) { 
  try {
    req.logout()
    return res.json({ message: 'Logout successful' })
  } catch (error) { 
    return res.status(500).json({ message: 'Error while logging out', error: error.message })
  }
}

async function getUser(req, res, next) { 
  try {
    const user = await User.getUserById(req.user._id)
    return res.json({ user })
  } catch (error) { 
    return res.status(500).json({ message: 'Error while getting user', error: error.message })
  }
}

async function updateUserController(req, res, next) { 
  const { userId } = req.params
  const updatedFields = req.body

  try {
    const updatedUser = await User.updateUser(userId, updatedFields)
    return res.json({ message: 'User updated successfully', user: updatedUser })
  } catch (error) { 
    return res.status(500).json({ message: 'Error while updating user', error: error.message })
  }
}

async function disableUserController(req, res, next) { 
  const { userId } = req.params

  try {
    const disabledUser = await User.disableUser(userId)
    return res.json({ message: 'User disabled successfully', user: disabledUser })
  } catch (error) { 
    return res.status(500).json({ message: 'Error while disabling user', error: error.message })
  }
}

async function enableUserController(req, res, next) { 
  const { userId } = req.params

  try {
    const enabledUser = await User.enableUser(userId)
    return res.json({ message: 'User enabled successfully', user: enabledUser })
  } catch (error) { 
    return res.status(500).json({ message: 'Error while enabling user', error: error.message })
  }
}

async function deleteUserController(req, res, next) { 
  const { userId } = req.params

  try {
    const deletedUser = await User.deleteUser(userId)
    return res.json({ message: 'User deleted successfully', user: deletedUser })
  } catch (error) { 
    return res.status(500).json({ message: 'Error while deleting user', error: error.message })
  }
}

async function getUserByIdController(req, res, next) { 
  const { userId } = req.params

  try {
    const user = await User.getUserById(userId)
    return res.json({ user })
  } catch (error) { 
    return res.status(500).json({ message: 'Error while getting user by id', error: error.message })
  }
}

async function getUserByUsernameController(req, res, next) { 
  const { username } = req.params

  try {
    const user = await User.getUserByUsername(username)
    return res.json({ user })
  } catch (error) { 
    return res.status(500).json({ message: 'Error while getting user by username', error: error.message })
  }
}

async function getUserByEmailController(req, res, next) {
  const { email } = req.params

  try {
    const user = await User.getUserByEmail(email)
    return res.json({ user })
  } catch (error) { 
    return res.status(500).json({ message: 'Error while getting user by email', error: error.message })
  } 
}

async function getAllUsersController(req, res, next) { 
  try {
    const users = await User.getAllUsers()
    return res.json({ users })
  } catch (error) { 
    return res.status(500).json({ message: 'Error while getting all users', error: error.message })
  }
}

module.exports = {
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
}