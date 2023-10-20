const Repository = require('./base.repository')
const { userModel } = require('../models')

const userRepository = new Repository('user', userModel)

module.exports = userRepository
