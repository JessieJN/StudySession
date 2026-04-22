// logic + imports StudySession, User and Course + creates session in db


//import to check if they exist before creating a session
const StudySession = require("../models/StudySession");
const User = require("../models/User");
const Course = require("../models/Course");


// ----- Create study session -----
const createStudySession = async (req, res) => {
    try {
        // Get data from request body
        const { user, course, date, durationMinutes, focusLevel, studyMethod, notes } = req.body;

        // Check required fields
        if (!user || !course || !date || durationMinutes === undefined || !focusLevel || !studyMethod) {
            return res.status(400).json({
                message: "User, course, date, durationMinutes, focusLevel and studyMethod are required"
            });
        }

        // Check that durationMinutes is a number
        if (typeof durationMinutes !== "number" || isNaN(durationMinutes)) {
            return res.status(400).json({
                message: "durationMinutes must be a number"
            });
        }

        // Check that durationMinutes is not negative
        if (durationMinutes < 0) {
            return res.status(400).json({
                message: "durationMinutes cannot be negative"
            });
        }

        // Check that focusLevel is a number
        if (typeof focusLevel !== "number" || isNaN(focusLevel)) {
            return res.status(400).json({
                message: "focusLevel must be a number"
            });
        }

        // Check that focusLevel is between 1 and 5
        if (focusLevel < 1 || focusLevel > 5) {
            return res.status(400).json({
                message: "focusLevel must be between 1 and 5"
            });
        }

        // Check that user exists
        const existingUser = await User.findById(user);

        if (!existingUser) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        // Check that course exists
        const existingCourse = await Course.findById(course);

        if (!existingCourse) {
            return res.status(404).json({
                message: "Course not found"
            });
        }

        // Create new session in db
        const newStudySession = await StudySession.create({
            user,
            course,
            date,
            durationMinutes,
            focusLevel,
            studyMethod,
            notes
        });

        // Send response message
        return res.status(201).json({
            message: "Study session created successfully",
            session: newStudySession
        });

    } catch (error) {
        return res.status(500).json({
            message: "Error creating study session",
            error: error.message
        });
    }
};


// ----- Get study sessions -----
const getStudySessions = async (req, res) => {
    try {
        // Find all sessions in db + populate user and course
        //populate() -> To get the entire object not just the ID (like JOIN)
        const sessions = await StudySession.find()
            .populate("user", "-password")
            .populate("course");

        return res.status(200).json(sessions);

    } catch (error) {
        return res.status(500).json({
            message: "Error fetching study sessions",
            error: error.message
        });
    }
};



// ----- Get study session by id -----
const getStudySessionById = async (req, res) => {
    try {
        // Get id from URL
        const { id } = req.params;

        // Find session by id + populate user and course
        const session = await StudySession.findById(id)
            .populate("user", "-password")
            .populate("course");

        if (!session) {
            return res.status(404).json({
                message: "Study session not found"
            });
        }

        return res.status(200).json(session);

    } catch (error) {
        return res.status(500).json({
            message: "Error fetching study session",
            error: error.message
        });
    }
};


// ----- Get study sessions by user -----
//To get and show the users sessions (ex. On My page)
const getStudySessionsByUser = async (req, res) => {
    try {
        // Get userId from URL
        const { userId } = req.params;

        // Find all sessions for this user + populate user and course
        const sessions = await StudySession.find({ user: userId })
            .populate("user", "-password")
            .populate("course");

        // If no sessions were found
        if (sessions.length === 0) {
            return res.status(200).json({
                message: "No study sessions found for this user",
                sessions: []
            });
        }

        return res.status(200).json(sessions);

    } catch (error) {
        return res.status(500).json({
            message: "Error fetching study sessions for user",
            error: error.message
        });
    }
};


// ----- Delete study session -----
const deleteStudySession = async (req, res) => {
    try {
        // Get id from URL
        const { id } = req.params;

        // Find session by id and delete it
        const deletedSession = await StudySession.findByIdAndDelete(id);

        if (!deletedSession) {
            return res.status(404).json({
                message: "Study session not found"
            });
        }

        return res.status(200).json({
            message: "Study session deleted successfully"
        });

    } catch (error) {
        return res.status(500).json({
            message: "Error deleting study session",
            error: error.message
        });
    }
};


// ----- Update study session -----
const updateStudySession = async (req, res) => {
    try {
        // Get id from URL
        const { id } = req.params;

        // Get data from request body
        const { user, course, date, durationMinutes, focusLevel, studyMethod, notes } = req.body;

        // Check required fields
        if (!user || !course || !date || durationMinutes === undefined || !focusLevel || !studyMethod) {
            return res.status(400).json({
                message: "User, course, date, durationMinutes, focusLevel and studyMethod are required"
            });
        }

        // Check that session exists first
        const existingSession = await StudySession.findById(id);

        if (!existingSession) {
            return res.status(404).json({
                message: "Study session not found"
            });
        }

        // Check that durationMinutes is a number
        if (typeof durationMinutes !== "number" || isNaN(durationMinutes)) {
            return res.status(400).json({
                message: "durationMinutes must be a number"
            });
        }

        // Check that durationMinutes is not negative
        if (durationMinutes < 0) {
            return res.status(400).json({
                message: "durationMinutes cannot be negative"
            });
        }

        // Check that focusLevel is a number
        if (typeof focusLevel !== "number" || isNaN(focusLevel)) {
            return res.status(400).json({
                message: "focusLevel must be a number"
            });
        }

        // Check that focusLevel is between 1 and 5
        if (focusLevel < 1 || focusLevel > 5) {
            return res.status(400).json({
                message: "focusLevel must be between 1 and 5"
            });
        }

        // Check that user exists
        const existingUser = await User.findById(user);

        if (!existingUser) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        // Check that course exists
        const existingCourse = await Course.findById(course);

        if (!existingCourse) {
            return res.status(404).json({
                message: "Course not found"
            });
        }

        // Update session in db
        const updatedSession = await StudySession.findByIdAndUpdate(
            id,
            {
                user,
                course,
                date,
                durationMinutes,
                focusLevel,
                studyMethod,
                notes
            },
            { new: true }
        )
            .populate("user", "-password")
            .populate("course");

        return res.status(200).json({
            message: "Study session updated successfully",
            session: updatedSession
        });

    } catch (error) {
        return res.status(500).json({
            message: "Error updating study session",
            error: error.message
        });
    }
};


module.exports = { createStudySession, getStudySessions, getStudySessionById, getStudySessionsByUser, deleteStudySession, updateStudySession };