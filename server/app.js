const express = require("express");
const app = express();
const courseRoutes = require("./routes/courseRoutes");
const userRoutes = require("./routes/userRoutes");

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Server is running");
});

app.use("/courses", courseRoutes);
app.use("/users", userRoutes);

module.exports = app;