// DEPENDENCIES
const cors = require("cors");
const express = require("express");
const songController = require("./controllers/songController");

// CONFIGURATION
const app = express();

// MIDDLEWARE
app.use(cors());
app.use(express.json());
app.use("/songs", songController);

// ROUTES
app.get("/", (req, res) => {
  res.send("Welcome to Tuner");
});

app.get("*", (req, res) => {
  res.status(404).res.send("Page not found");
});

// EXPORTS
module.exports = app;
