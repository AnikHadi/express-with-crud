const express = require("express");
const multer = require("multer");
const path = require("path");

const publicRouter = express.Router();

// const log = (req, res, next) => {
//   console.log(`This is log`);
//   next();
// };

// publicRouter.all("*", log);

// File upload Folder
const upload_Folder = "./uploads/";

// Define the storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, upload_Folder);
  },
  filename: (req, file, cb) => {
    // Import File.pdf => import-file-51326531.pdf
    const fileExt = path.extname(file.originalname);
    const fileName =
      file.originalname
        .replace(fileExt, "")
        .toLowerCase()
        .split(" ")
        .join("-") +
      "-" +
      Date.now();

    cb(null, fileName + fileExt);
  },
});

//prepare the final multer upload object
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024,
  },
  fileFilter: (req, file, cb) => {
    console.log(file);

    if (file.fieldname === "avatar") {
      if (
        file.mimetype === "image/png" ||
        file.mimetype === "image/jpg" ||
        file.mimetype === "image/jpeg"
      ) {
        cb(null, true);
      } else {
        cb(new Error("Only .jpg .png .jpeg file allowed!"));
      }
    } else if (file.fieldname === "doc") {
      if (file.mimetype === "application/pdf") {
        cb(null, true);
      } else {
        cb(new Error("Only pdf file allowed!"));
      }
    } else {
      cb(new Error("There was an unknown error!"));
    }
  },
});

publicRouter.get("/", (req, res) => {
  res.send("Router concept server is running");
});

// Single file
publicRouter.post("/single", upload.single("avatar"), (req, res) => {
  console.log(req.file);
  res.send("Single File upload successfully");
});

// Multiple file
publicRouter.post("/multiple", upload.array("avatar", 3), (req, res) => {
  console.log(req.files);
  res.send("Multi File upload successfully");
});

// multiple input field
publicRouter.post(
  "/multipleInput",
  upload.fields([
    { name: "avatar", maxCount: 1 },
    { name: "doc", maxCount: 1 },
  ]),
  (req, res) => {
    console.log(req.files);
    res.send("Multiple Input File upload successfully");
  }
);

publicRouter.get("/about", (req, res) => {
  res.send("About");
});

publicRouter.use((err, req, res, next) => {
  if (err) {
    if (err instanceof multer.MulterError) {
      res.status(500).send(`${err.message}: There was an upload error!`);
    } else {
      res.status(500).send(err.message);
    }
  } else {
    res.send("Success");
  }
});

module.exports = publicRouter;
