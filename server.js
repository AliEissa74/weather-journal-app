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

// parse application/json
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require("cors");

// Enable All CORS Requests
app.use(cors());

// Initialize the main project folder
app.use(express.static("website"));

// Callback function to complete GET '/all'
const getAll = function (req, res) {
  res.send(projectData);
};
// GET Route
app.get("/all", getAll);

// Callback function to complete POST '/add'
const postData = function (req, res) {
  projectData = req.body;
  console.log(projectData);
  res.send(projectData);
};
// GET Route
app.post("/add", postData);

// Setup Server
const port = 3000;
const hostname = "127.0.0.1";

// function to test the server
const listening = function () {
  console.log(`Server running at http://${hostname}:${port}/`);
};
// Spin up the server
const server=app.listen(port, listening);
