const task = {
    id: {
        type: 'number',
        required: true
    },
    taskName: {
        type: 'string',
        required: true,
        unique: true
    },
    isDone: {
        type: 'string',
        required: false
    },
    owner: {
        type: 'number',
        required: true
    },
}

module.exports = task