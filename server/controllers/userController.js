const fs = require("fs");
const jwt = require("jsonwebtoken");
const { userModel } = require("../models");
const {
  validateEntityFields,
  validateEntityUniqueness,
} = require("../repositories/helpers");
const {
  insertUser,
  verifyUser,
  handleAuthResponse,
  hashPassword,
} = require("./helpers");
const { handleError } = require("../helpers");

function register(request, response) {
  console.log("register");
  const user = request.body;
  const id = "uid" + new Date().getTime();

  const hashedPassword = user.password
    ? hashPassword(user.password)
    : undefined;
  const newUser = {
    id,
    ...user,
    password: hashedPassword,
  };
  let validationError = validateEntityFields(userModel, newUser);
  if (validationError) {
    response.statusCode = 401;
    response.setHeader("Content-Type", "application/json");
    response.end(validationError);
    return
  }
  let content = fs.readFileSync("./database/users.txt", "utf8");
  content = content ? JSON.parse(content) : [];
  content.push(newUser);
  fs.writeFileSync("./database/users.txt", JSON.stringify(content));
  
  response.statusCode = 201;
  response.setHeader("Content-Type", "application/json");
  response.end("Register success");

  // userRepository
  //   .createOne(newUser)
  //   .then((insertedUser) => {
  //     console.log("Log: register -> insertedUser", insertedUser);
  //     response.statusCode = 201;
  //     response.setHeader("Content-Type", "application/json");
  //     response.end("Sign up successfully.", insertedUser);
  //   })
  //   .catch((err) => {
  //     handleError(err, "controllers/index.js", "signUp");
  //     handleAuthResponse(response, false);
  //   });
}

// *INFO: Explain signUp function
// 1. We get the user data from request.body
// 2. We hash the password
// 3. We create a new user object with username and hashed password
// 4. We insert the new user to the database
// 5. If there is no error, we log the inserted user and return a success response
// 6. If there is an error, we log the error and return a fail response

function logIn(request, response) {
  const user = request.body;

  // response.setHeader("Content-Type", "application/json");
  // verifyUser(user)
  //   .then((foundUser) => {
  //     if (!foundUser) {
  //       throw new Error("User not found");
  //     }
  //     const token = jwt.sign({ userId: foundUser.id }, "RANDOM_TOKEN_SECRET", {
  //       expiresIn: "24h",
  //     });
  //     const data = {
  //       token,
  //     };
  //     response.end(JSON.stringify(data));
  //   })
  //   .catch((err) => {
  //     handleError(err, "controllers/index.js", "signIn");
  //     response.statusCode = 404;
  //     response.end("Username or password is not correct.");
  //   });
}

module.exports = {
  register,
  logIn,
};
