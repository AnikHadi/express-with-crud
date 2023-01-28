const express = require("express");

const adminRoute = express.Router();

adminRoute.get("/", (req, res) => {
  res.send("Dashboard");
});

adminRoute.get("/login", (req, res) => {
  res.send("Login");
});

module.exports = adminRoute;
