const express = require("express");
const app = express();
const feedRouter = require("./routes/feed");

// app.use(express.urlencoded({ extended: false })); // <form> x-www-form-urlencoded
app.use(express.json());

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
app.listen(5050);
