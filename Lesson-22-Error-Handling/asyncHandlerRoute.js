const express = require("express");
const fs = require("fs");
const asyncRouter = express.Router();

asyncRouter.get("/", (req, res, next) => {
  fs.readFile("/file-does-not-exist", (err, data) => {
    if (err) {
      next(err); // Pass errors to Express.
    } else {
      res.send(data);
    }
  });
});

// OR

asyncRouter.get("/or", (req, res, next) => {
  setTimeout(() => {
    try {
      console.log(a);
    } catch (err) {
      next(err);
    }
  }, 1000);
});

// tricky method
asyncRouter.get("/tricky", [
  (req, res, next) => {
    fs.readFile("/file-does-not-exist", (err, data) => {
      console.log(data);
      next(err);
    });
  },
  (req, res, next) => {
    console.log(data.property);
  },
]);

module.exports = asyncRouter;
