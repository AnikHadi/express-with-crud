const express = require("express");
const publicRouter = express.Router();

// const log = (req, res, next) => {
//   console.log(`This is log`);
//   next();
// };

// publicRouter.all("*", log);

publicRouter.get("/", (req, res) => {
  res.send("Router concept server is running");
});

// Single file
publicRouter.post("/single", (req, res) => {
  console.log(req.file);
  res.send("Single File upload successfully");
});

// Multiple file
publicRouter.post("/multiple", (req, res) => {
  console.log(req.files);
  res.send("Multi File upload successfully");
});

// multiple input field
publicRouter.post("/multipleInput", (req, res) => {
  console.log(req.files);
  res.send("Multiple Input File upload successfully");
});

publicRouter.get("/about", (req, res) => {
  res.send("About");
});

module.exports = publicRouter;
