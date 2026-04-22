// decides which URL + connects URL to the right function

const express = require("express");

// creates a mini-router for sessions
const router = express.Router();

// Gets the functions from the controller file
const { createStudySession } = require("../controllers/studySessionController");

// Tells if someone sends POST to / -> run createStudySession
router.post("/", createStudySession);

module.exports = router;