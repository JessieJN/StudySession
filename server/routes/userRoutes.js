// User routes
// Maps HTTP requests to controller functions

const express = require("express");

// creates a mini-router for users
const router = express.Router();

// Gets the functions from the controller file
const { createUser, getUsers, getUserById, deleteUser, updateUser, addCourseToUser, removeCourseFromUser, loginUser } = require("../controllers/userController");

// Tells if someone sends POST to / -> run createUser
router.post("/", createUser);

// Login user
router.post("/login", loginUser);


// Tells if someone sends GET to / -> run getUsers
router.get("/", getUsers);


// Add course to user array using PUT
router.put("/:id/add-course", addCourseToUser);

// Remove course from user
router.put("/:id/remove-course", removeCourseFromUser);


// Tells if someone sends GET to /:id -> run getUserById
router.get("/:id", getUserById);

// Tells if someone sends DELETE to /:id -> run deleteUser
router.delete("/:id", deleteUser);

// Tells if someone sends PUT to /:id -> run updateUser
router.put("/:id", updateUser);


module.exports = router;