const Repository = require('./base.repository')
const { taskModel } = require('../models')

const taskRepository = new Repository('task', taskModel)

module.exports = taskRepository