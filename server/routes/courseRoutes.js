//desides which URL + connects URL to the right function

const express = require("express");

//creates a mini-router for courses
const router = express.Router();

//Gets the createCourse function from the controller file
const { createCourse } = require("../controllers/courseController");

//Tells if someone send POST to / -> run createCourse
router.post("/", createCourse);

module.exports = router;