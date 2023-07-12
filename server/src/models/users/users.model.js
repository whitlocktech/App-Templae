const userDatabase = require('./users.mongo')
const gravatar = require('gravatar')

async function createUser(
  username,
  password,
  email,
  firstName,
  lastName,
  address,
  city,
  state,
  zipCode,
  country,
  phone,
  role,
) {
  const avatar = gravatar.url(email, {
    s: '200',
  })
  try {
    const user = new userDatabase({
      username,
      password,
      email,
      firstName,
      lastName,
      address,
      city,
      state,
      zipCode,
      country,
      phone,
      role,
      userStatus: 'active',
      avatar: avatar,
      createdAt: Date.now(),
    })
    const createdUser = await user.save()
    return createdUser
  } catch (error) { 
    throw new Error(`Error while creating user: ${error.message}`)
  }
}

async function updateUser(userId, updatedFields) {
  try {
    const updatedUser = await userDatabase.findByIdAndUpdate(
      userId,
      { ...updatedFields, updatedAt: Date.now() },
      { new: true },
    )
    return updatedUser
  } catch (error) { 
    throw new Error(`Error while updating user: ${error.message}`)
  }
}

async function disableUser(userId) {
  try {
    const disabledUser = await userDatabase.findByIdAndUpdate(
      userId,
      { userStatus: 'disabled', updatedAt: Date.now() },
      { new: true },
    )
    return disabledUser
  } catch (error) { 
    throw new Error(`Error while disabling user: ${error.message}`)
  }
}

async function enableUser(userId) { 
  try {
    const enabledUser = await userDatabase.findByIdAndUpdate(
      userId,
      { userStatus: 'active', updatedAt: Date.now() },
      { new: true },
    )
    return enabledUser
  } catch (error) { 
    throw new Error(`Error while enabling user: ${error.message}`)
  }
}

async function deleteUser(userId) { 
  try {
    const deletedUser = await userDatabase.findByIdAndDelete(userId)
    return deletedUser
  } catch (error) { 
    throw new Error(`Error while deleting user: ${error.message}`)
  }
}

async function getUserById(userId) { 
  try {
    const user = await userDatabase.findById(userId)
    return user
  } catch (error) { 
    throw new Error(`Error while getting user by id: ${error.message}`)
  }
}

async function getUserByUsername(username) { 
  try {
    const user = await userDatabase.findOne({ username })
    return user
  } catch (error) { 
    throw new Error(`Error while getting user by username: ${error.message}`)
  }
}

async function getUserByEmail(email) { 
  try {
    const user = await userDatabase.findOne({ email })
    return user
  } catch (error) { 
    throw new Error(`Error while getting user by email: ${error.message}`)
  }
}

async function getAllUsers(query = {}) { 
  try {
    const users = await userDatabase.find()
    return users
  } catch (error) { 
    throw new Error(`Error while getting all users: ${error.message}`)
  }
}

module.exports = {
  createUser,
  updateUser,
  disableUser,
  enableUser,
  deleteUser,
  getUserById,
  getUserByUsername,
  getUserByEmail,
  getAllUsers,
}