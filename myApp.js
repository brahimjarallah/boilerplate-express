var express = require("express")
var app = express()
var bGround = require("fcc-express-bground")
require("dotenv").config()

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
    res.send(req.time)
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

// Get Query Parameter Input from the Client

// Use body-parser to Parse POST Requests

// Get Data from POST Requests

module.exports = app
