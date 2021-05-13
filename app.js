const express = require("express");
const app = express();
const feedRouter = require("./routes/feed");
app.use(express.urlencoded({ extended: false }));

app.use("/feed", feedRouter);
app.listen(8081);
