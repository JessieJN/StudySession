// decides which URL + connects URL to the right function

const express = require("express");

// creates a mini-router for users
const router = express.Router();

// Gets the functions from the controller file
const { createUser, getUsers, getUserById, deleteUser, updateUser, addCourseToUser } = require("../controllers/userController");

// Tells if someone sends POST to / -> run createUser
router.post("/", createUser);

// Tells if someone sends GET to / -> run getUsers
router.get("/", getUsers);

// Tells if someone sends GET to /:id -> run getUserById
router.get("/:id", getUserById);

// Tells if someone sends DELETE to /:id -> run deleteUser
router.delete("/:id", deleteUser);

// Tells if someone sends PUT to /:id -> run updateUser
router.put("/:id", updateUser);
// Add course to user array using PUT
router.put("/:id/add-course", addCourseToUser);

module.exports = router;