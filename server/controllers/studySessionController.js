// logic + imports StudySession, User and Course + creates session in db


//import to check if they exist before creating a session
const StudySession = require("../models/StudySession");
const User = require("../models/User");
const Course = require("../models/Course");

// ----- Create study session ----
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

module.exports = { createStudySession };