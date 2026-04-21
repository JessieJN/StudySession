// decides which URL + connects URL to the right function

const express = require("express");

// creates a mini-router for users
const router = express.Router();

// Gets the functions from the controller file
const { createUser, getUsers, getUserById } = require("../controllers/userController");

// Tells if someone sends POST to / -> run createUser
router.post("/", createUser);

// Tells if someone sends GET to / -> run getUsers
router.get("/", getUsers);

// Tells if someone sends GET to /:id -> run getUserById
router.get("/:id", getUserById);

module.exports = router;