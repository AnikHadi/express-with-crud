const express = require("express");

const publicRouter = express.Router();

const log = (req, res, next) => {
  console.log(`This is log`);
  next();
};

publicRouter.all("*", log);

publicRouter.get("/", (req, res) => {
  res.send("Router concept server is running");
});

publicRouter.get("/about", (req, res) => {
  res.send("About");
});

module.exports = publicRouter;
