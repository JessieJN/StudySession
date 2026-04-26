// logic + imports Course + creates course in db
const Course = require("../models/Course");


// ----- Create a new course -----
const createCourse = async (req, res) => {
    try {
        // Get data from request body
        const { name, code, program, semester, credits } = req.body;

        // Check required fields
        if (!name || !code || credits === undefined) {
            return res.status(400).json({ message: "Name, code and credits are required" });
        }

        // Check that credits are a number
        if (isNaN(credits)) {
            return res.status(400).json({ message: "Credits must be a number" });
        }

        // Check that credits are not negative
        if (credits < 0) {
            return res.status(400).json({ message: "Credits cannot be negative" });
        }

        // Check duplicate course code
        const existingCourse = await Course.findOne({ code });

        if (existingCourse) {
            return res.status(409).json({ message: "A course with this code already exists" });
        }

        // Create new course in db
        const newCourse = await Course.create({
            name,
            code,
            program,
            semester,
            credits
        });

        // Send response message
        return res.status(201).json({
            message: "Course created successfully",
            course: newCourse
        });
    } catch (error) {
        return res.status(500).json({
            message: "Error creating course",
            error: error.message
        });
    }
};


// ----- Get courses -----
const getCourses = async (req, res) => {
    try {
        // Find all courses in db
        const courses = await Course.find();

        // Send all courses
        return res.status(200).json(courses);

    } catch (error) {
        return res.status(500).json({
            message: "Error fetching courses",
            error: error.message
        });
    }
};


// ----- Get course by ID -----
const getCourseById = async (req, res) => {
    try {
        // Get id from URL
        const { id } = req.params;

        // Find course by id
        const course = await Course.findById(id);

        if (!course) {
            return res.status(404).json({ message: "Course not found" });
        }

        return res.status(200).json({ course });

    } catch (error) {
        return res.status(500).json({
            message: "Error fetching course",
            error: error.message
        });
    }
};


// ----- Delete course -----
const deleteCourse = async (req, res) => {
    try {
        // Get id from URL
        const { id } = req.params;

        // Delete course by id
        const deletedCourse = await Course.findByIdAndDelete(id);

        if (!deletedCourse) {
            return res.status(404).json({ message: "Course not found" });
        }

        return res.status(200).json({ message: "Course deleted successfully" });

    } catch (error) {
        return res.status(500).json({
            message: "Error deleting course",
            error: error.message
        });
    }
};


// ----- Update course -----
const updateCourse = async (req, res) => {
    try {
        // Get id from URL and data from request body
        const { id } = req.params;
        const { name, code, program, semester, credits } = req.body;

        // Check required fields
        if (!name || !code || credits === undefined) {
            return res.status(400).json({ message: "Name, code and credits are required" });
        }

        // Check that credits are a number
        if (isNaN(credits)) {
            return res.status(400).json({ message: "Credits must be a number" });
        }

        // Check that credits is not negative
        if (credits < 0) {
            return res.status(400).json({ message: "Credits cannot be negative" });
        }

        // Check for duplicate course code
        const existingCourse = await Course.findOne({ code });

        if (existingCourse && existingCourse._id.toString() !== id) {
            return res.status(409).json({ message: "A course with this code already exists" });
        }

        // Update course in db
        const updatedCourse = await Course.findByIdAndUpdate(
            id,
            { name, code, program, semester, credits },
            { new: true }
        );

        if (!updatedCourse) {
            return res.status(404).json({ message: "Course not found" });
        }

        return res.status(200).json({
            message: "Course updated successfully",
            course: updatedCourse
        });

    } catch (error) {
        return res.status(500).json({
            message: "Error updating course",
            error: error.message
        });
    }
};


// ===== CUSTOM ENDPOINT =====
// ----- Search and filter courses -----


const searchCourses = async (req, res) => {
    try {
        // Get search and program from query
        const { search, program } = req.query;

        // Check that at least one query parameter was sent
        if (!search && !program) {
            return res.status(400).json({
                message: "Please provide search or program"
            });
        }

        // Create filter object
        const filter = {};

        // Add program filter if program was sent
        if (program) {
            filter.program = program;
        }

        // Add search filter for course name or course code if search was sent
        if (search) {
            filter.$or = [
                { name: { $regex: search, $options: "i" } },
                { code: { $regex: search, $options: "i" } }
            ];
        }

        // Find courses that match the filter
        const courses = await Course.find(filter);

        // Send matching courses
        return res.status(200).json(courses);

    } catch (error) {
        return res.status(500).json({
            message: "Error searching courses",
            error: error.message
        });
    }
};


module.exports = { createCourse, getCourses, getCourseById, deleteCourse, updateCourse, searchCourses };