const { query } = require("express")
var express = require("express")
var app = express()
var bGround = require("fcc-express-bground")
require("dotenv").config()
var bodyParser = require("body-parser")

// Use body-parser to Parse POST Requests
//   Note: extended = false is a configuration option that tells the parser to use the classic encoding.When using it, values can be only strings or arrays.The extended version allows more data flexibility, but it is outmatched by JSON.

app.use((req, res, next) => {
  bodyParser.urlencoded({ extended: false })
  next()
})

// Implement a Root-Level Request Logger Middleware

app.use((req, res, next) => {
  console.log(req.method + " " + req.path + " - " + req.ip)
  next()
})

// Meet the Node console
bGround.log("Hello World")
console.log("Hello World")

// Start a Working Express Server

// app.get("/", (req, res) => {
//   res.send("Hello Express")
// })

// Serve an HTML File
app.get("/", (req, res) => {
  const absolutePath = __dirname + "/views/index.html"
  res.sendFile(absolutePath)
})
// Serve Static Assets
app.use("/public", express.static(__dirname + "/public"))

// Serve JSON on a Specific Route
// app.get("/json", (req, res) => {
//   res.json({ message: "Hello json" })
// })

// Use the .env File

app.get("/json", (req, res) => {
  var resJson = { message: "Hello json" }
  if (process.env.MESSAGE_STYLE === "uppercase") {
    resJson.message = resJson.message.toUpperCase()
  }
  res.json(resJson)
})

// Chain Middleware to Create a Time Server

// In the route app.get('/now', ...) chain a middleware function and the final handler.
// In the middleware function you should add the current time to the request object in the req.time key
// You can use new Date().toString()
// In the handler, respond with a JSON object, taking the structure { time: req.time }
app.get(
  "/now",
  (req, res, next) => {
    req.time = Date().toString()
    next()
  },
  (req, res) => {
    // res.send(req.time)
    res.json({ time: req.time })
  }
)

// app.get(
//   "/user",
//   function (req, res, next) {
//     req.user = getTheUserSync() // Hypothetical synchronous operation
//     next()
//   },
//   function (req, res) {
//     res.send(req.user)
//   }
// )

// Get Route Parameter Input from the Client

// Build an echo server, mounted at the route GET /:word/echo. Respond with a JSON object,
// taking the structure { echo: word }.You can find the word to be repeated at req.params.word
// You can test your route from your browser's address bar, visiting some matching routes
//  e.g. your-app-rootpath/freecodecamp/echo.

app.get("/:word/echo", (req, res) => {
  res.json({ echo: req.params.word })
})

// Get Query Parameter Input from the Client

// Build an API endpoint, mounted at GET /name.
// Respond with a JSON document, taking the structure { name: 'firstname lastname' }.
// The first and last name parameters should be encoded in a query string e.g. ? first = firstname & last=lastname.

// Note: In the following exercise you are going to receive data from a POST request, at the same /name route path. If you want, you can use the method app.route(path).get(handler).post(handler). This syntax allows you to chain different verb handlers on the same path route. You can save a bit of typing, and have cleaner code.

app.get("/name", (req, res) => {
  // console.log(req.query)
  res.json({ name: req.query.first + " " + req.query.last })
})

// Get Data from POST Requests

module.exports = app
