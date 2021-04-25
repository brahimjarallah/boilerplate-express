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

// Get Route Parameter Input from the Client

// Get Query Parameter Input from the Client

// Use body-parser to Parse POST Requests

// Get Data from POST Requests

module.exports = app
