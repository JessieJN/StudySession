//desides which URL + connects URL to the right function

const express = require("express");

//creates a mini-router for courses
const router = express.Router();

//Gets the functions from the controller file
const { createCourse, getCourses, getCourseById, deleteCourse, updateCourse } = require("../controllers/courseController");

//Tells if someone send POST to / -> run createCourse
router.post("/", createCourse);

//Tells if someone send GET to / -> run getCourses
router.get("/", getCourses);

//Tells if someone send GET by id to / -> run getCoursesById
router.get("/:id", getCourseById);

//Tells if someone send DELETE by id to / -> run deleteCourse
router.delete("/:id", deleteCourse);

//Tells if someone send PUT by id to / -> run updateCourse
router.put("/:id", updateCourse);


module.exports = router;