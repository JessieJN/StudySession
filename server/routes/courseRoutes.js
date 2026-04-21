//desides which URL + connects URL to the right function

const express = require("express");

//creates a mini-router for courses
const router = express.Router();

//Gets the functions from the controller file
const { createCourse, getCourses } = require("../controllers/courseController");

//Tells if someone send POST to / -> run createCourse
router.post("/", createCourse);

//Tells if someone send GET to / -> run getCourses
router.get("/", getCourses);


module.exports = router;