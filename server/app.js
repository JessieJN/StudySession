const express = require("express");
const app = express();
const courseRoutes = require("./routes/courseRoutes");

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Server is running");
});

app.use("/courses", courseRoutes);

module.exports = app;