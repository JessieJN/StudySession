// decides which URL + connects URL to the right function

const express = require("express");

// creates a mini-router for sessions
const router = express.Router();

// Gets the functions from the controller file
const { createStudySession, getStudySessions, getStudySessionById, getStudySessionsByUser, deleteStudySession, updateStudySession } = require("../controllers/studySessionController");

// Tells if someone sends POST to / -> run createStudySession
router.post("/", createStudySession);

// Tells if someone sends GET to / -> run getStudySessions
router.get("/", getStudySessions);
//By user
router.get("/user/:userId", getStudySessionsByUser);
//By ID
router.get("/:id", getStudySessionById);


//Tells if someone sends DELETE to / -> run deleteStudySession
router.delete("/:id", deleteStudySession);

//Tells if someone sends PUT to / -> run updateStudySession
router.put("/:id", updateStudySession);

module.exports = router;