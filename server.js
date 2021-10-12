// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require("express");
// Start up an instance of app
const app = express();

/* Middleware*/
//body-parser allow the backend to access JSON data sent from the client using request.body in POST route handler.
const bodyParser = require("body-parser");

// parse application/urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require("cors");
app.use(cors());

// Initialize the main project folder
app.use(express.static("website"));

// Callback function to complete GET '/all'
const sendData = function (req, res) {
  res.send(projectData);
};
app.get("/all", sendData);

// Callback function to complete POST '/add'
const postAllData = function (req, res) {
  projectData = req.body;
  console.log(projectData);
  res.status(200).send(projectData);
};
app.post("/add", postAllData);

// Server Setup
const address="127.0.0.2";
const port = 3000;

// function to test the server
function listening() {
  console.log('Server running');
  console.log(`running on http://${address}:${port}/`)
};
// Spin up the server
const server = app.listen(port, listening);
