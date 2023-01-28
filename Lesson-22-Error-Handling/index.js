const express = require("express");
const app = express();
const publicRouter = require("./publicRouter");
const adminRouter = require("./adminRoute");
const asyncRouter = require("./asyncHandlerRoute");
const port = process.env.PORt || 5000;

// middleware
app.use(express.json());

app.use("/", publicRouter);
app.use("/admin", adminRouter);
app.use("/async", asyncRouter);

// 404 error handler
app.use((req, res, next) => {
  res.status(500).send("Request URL was not found!");
});

app.use((err, req, res, next) => {
  if (res.headersSet) {
    next("There was a problem");
  } else {
    if (err.message) {
      res.status(500).send(err.message);
    } else {
      res.status(500).send("There was an error");
    }
  }
});

app.listen(port, () => {
  console.log("Router concept server listening on port: ", port);
});
