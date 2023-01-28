const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();

const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cookieParser());

const adminRoute = express.Router();

adminRoute.get("/dashboard", (req, res) => {
  // console.log(req.baseUrl);
  // console.log(req.originalUrl);
  // console.log(req.url);
  // console.log(req.path);
  console.log(req.hostname);
  res.send("We are in admin Dashboard");
});

app.use("/admin", adminRoute);
app.get("/", (req, res) => {
  res.send("This is Beginning start Node js Server!");
});

app.post("/user/:id", (req, res) => {
  const apps = req.app;
  // console.log(req.baseUrl);
  // console.log(req.originalUrl);
  // console.log(req.url);
  // console.log(req.path);
  // console.log(req.method);
  // console.log(req.protocol);
  // console.log(req.hostname);
  // console.log(req.params);
  // console.log(req.query);
  console.log(req.cookies);
  console.log(req.body);
  res.send("we are in simple app");
});

app.get("/user", (req, res) => {
  console.log(req.body);
  res.send(req.body);
});

// app.get("/admin/dashboard", (req, res) => {
//   const baseUrl = req.baseUrl;
//   const url = req.url;
//   const path = req.path;
//   const originalUrl = req.originalUrl;
//   console.log("baseUrl", baseUrl);
//   console.log("url", url);
//   console.log("path", path);
//   console.log("originalUrl", originalUrl);
//   // console.log();
//   res.send("This is sub app");
// });

app.post("/", (req, res) => {
  const data = req.body;
  console.log(data);
  res.send(data);
});

app.listen(port, () => {
  console.log("Server on listening port is : ", port);
});
