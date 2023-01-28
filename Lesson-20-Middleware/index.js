const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
const adminRouter = express();

const port = process.env.PORT || 5000;

// middleware
app.use(express.json());
app.use(cookieParser());
app.use("/admin", adminRouter);

/* Sub app use korle always 

step 1. Define mount path
step 2. Implement the middleware section
step 3. use middleware
step 4. use define router 

*/

const loggerWarper = (options) => {
  return (req, res, next) => {
    if (options.log) {
      console.log(
        `${new Date(Date.now()).toLocaleString()} - ${req.method} - ${
          req.protocol
        } - ${req.originalUrl} - ${req.ip}`
      );
      next();
    } else {
      throw new Error("Failed to log");
    }
  };
};

// const logger = (req, res, next) => {
//   console.log(
//     `${new Date(Date.now()).toLocaleString()} - ${req.method} - ${
//       req.protocol
//     } - ${req.originalUrl} - ${req.ip}`
//   );
//   throw new Error("This is an error");
// };

adminRouter.use(loggerWarper({ log: true }));

adminRouter.get("/dashboard", (req, res) => {
  res.send("Admin Dashboard");
});

app.get("/", (req, res) => {
  console.log("This is get method");
  res.send("This is get method.");
});

app.get("/about", (req, res) => {
  console.log("This is get method on about URL.");
  res.send("This is get method on about URL.");
});

const errorMiddleware = (err, req, res, next) => {
  console.log(err.message);
  res.status(500).send("There was a server side error!");
};

adminRouter.use(errorMiddleware);

app.listen(port, () => {
  console.log("This server listen on port: ", port);
});
