//logic + imports Course + creates course in db
const Course = require("../models/Course");


// ----- Create a new course -----
const createCourse = async (req, res) => {
    try {
        //Get data from request body
        const { name, code, program, semester, credits} = req.body;

        //Check required fields
        if (!name || !code || credits === undefined) {
            return res.status(400).json({ message: "Name, code and credits are required"});
        }

        //Check that credits are a number
        if (isNaN(credits)) {
            return res.status(400).json({message: "Credits must be a number"});
        }

        //Check that credits are not negative
        if (credits < 0) {
            return res.status(400).json({message: "Credits cannot be negative"});
        }

        //Check duplicate course code
        const existingCourse = await Course.findOne({ code });

        if (existingCourse) {
            return res.status(409).json({ message: "A course with this code already exists"});
        }

        //Create new course in db
        const newCourse = await Course.create({
            name,
            code,
            program,
            semester,
            credits
        });

        //Send response message
        res.status(201).json({
            message: "Course created successfully",
            course: newCourse
        });
    } catch (error) {
        res.status(500).json({
            message: "Error creating course",
            error: error.message
        });
    }
};


module.exports = { createCourse};