const express = require("express");
const app = express();
const path = require("path");
const multer = require("multer");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

const feedRouter = require("./routes/feed");
const authRouter = require("./routes/auth");

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI;

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});
const fileFilter = (req, file, cb) => {
  const validMimetype = ["image/png", "image/jpg", "image/jpeg"];
  if (validMimetype.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

// app.use(express.urlencoded({ extended: false })); // <form> x-www-form-urlencoded
app.use(express.json());
app.use(multer({ storage: fileStorage, fileFilter }).single("image"));
app.use("/images", express.static(path.join(__dirname, "images")));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, PUT, PATCH, POST, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use("/feed", feedRouter);
app.use("/auth", authRouter);
app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  res.status(status).json({ message: message, data: error.data });
});

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log(`DB: Connected!`);
    const server = app.listen(5050);
    const io = require("./socket").init(server);
    io.on("connection", (socket) => {
      console.log(`client connected ${socket.id}`);
    });
  })
  .catch((err) => {
    console.log(`ERROR: Connected to db fail`);
    console.log(err);
  });
