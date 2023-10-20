const url = require('url')
const userControllers = require('./userController')
const taskControllers = require('./taskController')

function handleNotFound(req, res) {
    const parsedUrl = url.parse(req.url, true)
    res.statusCode = 404
    res.end(`Route ${parsedUrl.pathname} not found.`)
}

function pingWithAuth(req, res) {
    res.end('Success')
}

module.exports = {
    handleNotFound,
    pingWithAuth,
    userControllers,
    taskControllers
}