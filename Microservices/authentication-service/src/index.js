// src/index.js
const express = require("express");
const dotenv = require("dotenv");

const path = require("path");
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3011;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Static file
app.use(express.static(__dirname + "/public"));

// Routes
const routes = require("./routes"); //Default is index.js
app.use("/", routes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT} http://localhost:${PORT}`);
});
