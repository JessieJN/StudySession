// decides which URL + connects URL to the right function

const express = require("express");

// creates a mini-router for sessions
const router = express.Router();

// Gets the functions from the controller file
const { createStudySession, getStudySessions, getStudySessionById } = require("../controllers/studySessionController");

// Tells if someone sends POST to / -> run createStudySession
router.post("/", createStudySession);

// Tells if someone sends GET to / -> run getStudySessions
router.get("/", getStudySessions);
//By ID
router.get("/:id", getStudySessionById);

module.exports = router;