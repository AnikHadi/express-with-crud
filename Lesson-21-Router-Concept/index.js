const express = require("express");
const adminRoute = require("./adminRoute");
const publicRouter = require("./publicRouter");
const app = express();
const port = process.env.PORt || 5000;

// middleware
app.use(express.json());

//  Route mount path
app.use("/admin", adminRoute);

// public router last a use korte hobe
app.use("/", publicRouter);

app.listen(port, () => {
  console.log("Router concept server listening on port: ", port);
});
