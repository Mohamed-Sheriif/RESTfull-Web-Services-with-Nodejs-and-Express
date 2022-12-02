const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();
const db = mongoose.connect("mongodb://localhost/library");
const Book = require("./models/bookModel");
const bookRouter = require("./routes/bookRouter")(Book);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/api", bookRouter);

app.get("/", (req, res) => {
  res.send("hello world !");
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
