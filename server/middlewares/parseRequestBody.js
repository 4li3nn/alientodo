const { handleError } = require("../helpers");

function parseRequestBody(request) {
  try {
    return new Promise((resolve, reject) => {
      const chunks = [];
      request
        .on("data", (chunk) => {
          chunks.push(chunk);
        })
        .on("end", () => {
          const parsedBody = Buffer.concat(chunks).toString();
          request.body = JSON.parse(parsedBody)
          resolve();
        });
    });
  } catch (err) {
    if (!err.message) {
      // handleError(err, "middlewares/parse-request-body.js", "parseRequestBody");
      console.log("error in parserRequestBody.js", err);
    }
    const message = err.message || "Invalid request!";
    res.statusCode = 401;
    res.end(message);
  }
}

module.exports = parseRequestBody;
