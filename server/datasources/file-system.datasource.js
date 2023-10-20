const fs = require('fs').promises
const { handleError } = require('../helpers')

function FileSystemDataSource(databasePath = '') {
  this.databasePath = databasePath

  this.readCollection = function readCollection(collectionName = '') {
    const collectionPath = `${this.databasePath}/${collectionName.toLowerCase()}.txt`

    return fs.readFile(collectionPath)
      .then(data => {
        const parsedData = JSON.parse(data) || []
        return parsedData
      })
      .catch(err => {
        handleError(err, 'datasources/file-system.datasource.js', 'readCollection')
        return []
      })
  }

  this.updateCollection = function updateCollection(collectionName = '', newData) {
    const collectionPath = `${this.databasePath}/${collectionName.toLowerCase()}.txt`
    return fs.writeFile(collectionPath, JSON.stringify(newData)).catch(() => {
      // create database folder in case error due to database folder does not exist
      return fs.mkdir(database)
        .then(() => fs.writeFile(this.databasePath, JSON.stringify(newData)))
        .catch(err => {
          handleError(err, 'datasources/file-system.datasource.js', 'updateCollection')
        })
    })
  }
}

module.exports = FileSystemDataSource

//*INFO: Explain code above
// 1. We have a constructor function called FileSystemDataSource that takes 1 argument: databasePath
// 2. The function readCollection takes 1 argument: collectionName and return a promise that resolves to an array of data using fs.readFile
// 2.1. fs.readFile reads the file at collectionPath and return a promise that resolves to the data in the file
// 2.2. We parse the data to JSON and return it
// 2.3. If there is an error, we log the error and return an empty array
// 3. The function updateCollection takes 2 arguments: collectionName and newData and return a promise that resolves to undefined using fs.writeFile
// 3.1. fs.writeFile writes the file at collectionPath with the new data
// 3.2. If there is an error, we log the error and return undefined
// 4. We export the FileSystemDataSource function
// 5. We can use the FileSystemDataSource function as a constructor to create a new FileSystemDataSource object

// What is constructor function?
// A constructor function is a function that returns an object.
// For example:
// function Person(name, age) {
//   this.name = name
//   this.age = age
// }
//
// const person = new Person('Thanh', 18)
// console.log(person) // Output: { name: 'Thanh', age: 18 }
//
// const person2 = new Person('Hoang', 20)
// console.log(person2) // Output: { name: 'Hoang', age: 20 }

// Translate constructor function to Vietnamese:
// constructor function -> hàm khởi tạo