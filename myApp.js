var express = require("express")
var app = express()
var bGround = require("fcc-express-bground")

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

// Use the .env File

// Implement a Root-Level Request Logger Middleware

// Chain Middleware to Create a Time Server

// Get Route Parameter Input from the Client

// Get Query Parameter Input from the Client

// Use body-parser to Parse POST Requests

// Get Data from POST Requests

module.exports = app
