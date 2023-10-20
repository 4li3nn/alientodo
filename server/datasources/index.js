const FileSystemDataSource = require('./file-system.datasource')

const database = './database'

const DBCollections = {
    user: 'users',
    task: 'tasks'
}

const fileSystemDataSource = new FileSystemDataSource(database)

module.exports = { DBCollections, fileSystemDataSource }