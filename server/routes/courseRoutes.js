//desides which URL + connects URL to the right function

const express = require("express");

//creates a mini-router for courses
const router = express.Router();

//Gets the functions from the controller file
const { createCourse, getCourses, getCourseById } = require("../controllers/courseController");

//Tells if someone send POST to / -> run createCourse
router.post("/", createCourse);

//Tells if someone send GET to / -> run getCourses
router.get("/", getCourses);

//Tells if someone send GET by id to / -> run getCourses
router.get("/:id", getCourseById);


module.exports = router;