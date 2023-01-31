const express = require("express");
const mongoose = require("mongoose");
const publicRouter = require("./routeHandler/publicRouter");
const todoRouter = require("./routeHandler/todoHandler");

const port = process.env.PORt || 5000;

// express app initialization
const app = express();
// middleware
app.use(express.json());

// router handler section
app.use("/", publicRouter);
app.use("/todo", todoRouter);

// mongoose section
mongoose.set("strictQuery", true);
mongoose
  .connect("mongodb://127.0.0.1:27017/todos")
  .then(() => console.log("Connection Successfully"))
  .catch((err) => console.log(err));

const errorHandler = (err, req, res, next) => {
  if (err.headersSent) {
    return next(err);
  } else {
    res.status(500).json({ error: err });
  }
};

app.use((err, req, res, next) => {
  if (err.message) {
    res.status(500).send(err.message);
  } else {
    res.status(500).send("There was an error");
  }
});

app.listen(port, () => {
  console.log("Router concept server listening on port: ", port);
});
