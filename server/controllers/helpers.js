const crypto = require('crypto')
const {
    userRepository,
    taskRepository
} = require('../repositories')

function insertUser(user) {
    const hashedPassword = user.password ? hashPassword(user.password) : undefined
    const newUser = {
        username: user.username,
        password: hashedPassword
    }
    return userRepository.createOne(newUser)
}

function findTask(id) {
    return taskRepository.filterById(id)
}

function insertTask(task) {
    const newTask = {
        taskName: task.taskName,
        isDone: "false",
        owner: task.owner
    }
    return taskRepository.createOne(newTask)
}

function updateTask(task) {
    return taskRepository.updateOne(task)
}

function removeTask(task) {
    return taskRepository.removeOne(task)
}

function hashPassword(password) {
    const hash = crypto.createHash('sha256')
    return hash.update(password).digest('hex')
}

function verifyUser(checkingUser) {
    return userRepository.find()
        .then(users => (users || []).find(user =>
            user.username === checkingUser.username &&
            user.password === hashPassword(checkingUser.password)
        ))
}

function handleAuthResponse(response, isSuccessful = false) {
    const data = {
        status: isSuccessful ? 'success' : 'fail'
    }
    response.setHeader('Content-Type', 'application/json');
    response.end(JSON.stringify(data));
}

module.exports = { insertUser, verifyUser, handleAuthResponse, findTask, insertTask, updateTask, removeTask, hashPassword }