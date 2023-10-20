const http = require('http')
const router = require('./router')
const port = 3001
const server = http.createServer((request, response) => {
    const controller = router.route(request)
    controller(request, response)
})
server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});

// View ----request--> Server ----response----> View

// Server -> (Middleware) -> Controller <-> Repository <-> Model 
// .\\.     .                                       <-> DataSource <-> Database
//   .    .//.
// Router

//*INFO: Explain code above
// 1. Create a server with http.createServer() method
// 2. Use router.route() to get controller
// 3. Use controller to handle request and response
// 4. Listen to port 8080
// 5. Log a message to console to confirm server is running
// 6. Run the code and open http://localhost:8080/ in browser to see the result

// What is nodejs?
// Node.js is an open-source, cross-platform, back-end JavaScript runtime
// environment that runs on the V8 engine and executes JavaScript code outside
// a web browser.

// What is npm?
// npm is the package manager for the Node JavaScript platform. It puts modules
// in place so that node can find them, and manages dependency conflicts
// intelligently.

// What is argument?
// An argument is a value passed to a function when the function is called.
// Arguments are specified after the function name, inside the parentheses.
// You can add as many arguments as you want, just separate them with a comma.
