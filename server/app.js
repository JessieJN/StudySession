const express = require("express");
const app = express();
const courseRoutes = require("./routes/courseRoutes");
const userRoutes = require("./routes/userRoutes");
const studySessionRoutes = require("./routes/studySessionRoutes");
const cors = require("cors");

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Server is running");
});

app.use("/courses", courseRoutes);
app.use("/users", userRoutes);
app.use("/sessions", studySessionRoutes);


module.exports = app;