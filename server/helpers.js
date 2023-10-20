exports.handleError = function handleError(
  error,
  filePath = '',
  functionName = ''
){
  console.error(`${filePath} -> ${functionName} -> Error:`, error)
}

//*INFO: Explain code above
// 1. We have a function called handleError that takes 3 arguments: error, filePath, functionName
// 2. The function will log the error message to the console