const express = require("express");
const publicRouter = require("./publicRouter");
const port = process.env.PORt || 5000;

// middleware
const app = express();

app.use("/", publicRouter);

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
