const jwt = require('jsonwebtoken');
const { userRepository } = require('../repositories')
const { handleError } = require('../helpers')

function authenticate(req, res) {
  try {
    if (!req.headers.authorization) {
      throw new Error('Invalid token.')
    }
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    const { userId } = decodedToken;

    return userRepository.findById(userId).then(foundUser => {
      if (!foundUser) {
        throw new Error('Invalid token.')
      }
    })
  } catch (err) {
    if (!err.message) {
      handleError(err, 'middlewares/authentication.js', 'authenticate')
    }
    const message = err.message || 'Invalid request!'
    res.statusCode = 401
    res.end(message)
  }
}

module.exports = authenticate

//*INFO: Explain code above
// 1. Create a function authenticate
// 2. Use try catch to handle error
// 3. Check if request has authorization header
// 4. Get token from authorization header
// 5. Verify token
// 6. Get userId from decoded token
// 7. Find user by userId in database through userRepository
// 8. If user is not found, throw an error
// 9. Return a promise
// 10. If error is caught, handle error
// 11. If error message is not available, handle error
// 12. Set error message
// 13. Set status code to 401
// 14. End response with error message