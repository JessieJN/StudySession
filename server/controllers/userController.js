// logic + imports User + creates/fetches users in db

const mongoose = require("mongoose");
const User = require("../models/User");
const Course = require("../models/Course");
const bcrypt = require("bcrypt");


// ----- Create user -----
const createUser = async (req, res) => {
    try {
        // Get data from request body
        let { name, email, password, courses } = req.body;

        // Check required fields
        if (!name || !email || !password) {
            return res.status(400).json({
                message: "Name, email and password are required"
            });
        }

        // Normalize email
        email = email.trim().toLowerCase();

        // Check email format
        if (!email.includes("@")) {
            return res.status(400).json({
                message: "Invalid email format"
            });
        }

        // Check duplicate email
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(409).json({
                message: "A user with this email already exists"
            });
        }

        // Check password length
        if (password.length < 6) {
            return res.status(400).json({
                message: "Password must be at least 6 characters"
            });
        }

        // Hash password before saving
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user in db
        const newUser = await User.create({
            name,
            email,
            password: hashedPassword,
            courses: courses || []
        });

        // Get user again without password
        const safeUser = await User.findById(newUser._id)
            .select("-password")
            .populate("courses");

        // Send response message
        return res.status(201).json({
            message: "User created successfully",
            user: safeUser
        });

    } catch (error) {
        return res.status(500).json({
            message: "Error creating user",
            error: error.message
        });
    }
};


// ----- Get users -----
const getUsers = async (req, res) => {
    try {
        // Find all users in db
        const users = await User.find().select("-password").populate("courses");

        // Send all users
        return res.status(200).json(users);

    } catch (error) {
        return res.status(500).json({
            message: "Error fetching users",
            error: error.message
        });
    }
};


// ----- Get user by id -----
const getUserById = async (req, res) => {
    try {
        // Get id from URL
        const { id } = req.params;

        // Check if id is valid
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                message: "Invalid user id"
            });
        }

        // Find user by id
        const user = await User.findById(id).select("-password").populate("courses");

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        // Send user
        return res.status(200).json(user);

    } catch (error) {
        return res.status(500).json({
            message: "Error fetching user",
            error: error.message
        });
    }
};


// ----- Delete user -----
const deleteUser = async (req, res) => {
    try {
        // Get id from URL
        const { id } = req.params;

        // Check if id is valid
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                message: "Invalid user id"
            });
        }

        // Delete user by id
        const deletedUser = await User.findByIdAndDelete(id);

        if (!deletedUser) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        return res.status(200).json({
            message: "User deleted successfully"
        });

    } catch (error) {
        return res.status(500).json({
            message: "Error deleting user",
            error: error.message
        });
    }
};


// ----- Update user -----
const updateUser = async (req, res) => {
    try {
        // Get id from URL and data from request body
        const { id } = req.params;
        let { name, email, password, courses } = req.body;

        // Check if id is valid
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                message: "Invalid user id"
            });
        }

        // Check required fields
        if (!name || !email || !password) {
            return res.status(400).json({
                message: "Name, email and password are required"
            });
        }

        // Check correct types
        if (typeof name !== "string" || typeof email !== "string" || typeof password !== "string") {
            return res.status(400).json({
                message: "Name, email and password must be strings"
            });
        }

        // Normalize name and email
        name = name.trim();
        email = email.trim().toLowerCase();

        // Check if fields are empty after trim
        if (!name || !email || !password.trim()) {
            return res.status(400).json({
                message: "Name, email and password cannot be empty"
            });
        }

        // Check email format
        if (!email.includes("@")) {
            return res.status(400).json({
                message: "Invalid email format"
            });
        }

        // Check password length
        if (password.length < 6) {
            return res.status(400).json({
                message: "Password must be at least 6 characters"
            });
        }

        // Check if user exists FIRST
        const existingUserById = await User.findById(id);

        if (!existingUserById) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        // Check duplicate email on another user
        const existingUser = await User.findOne({ email });

        if (existingUser && existingUser._id.toString() !== id) {
            return res.status(409).json({
                message: "A user with this email already exists"
            });
        }

        // Hash password before updating
        const hashedPassword = await bcrypt.hash(password, 10);

        // Update user in db
        await User.findByIdAndUpdate(
            id,
            {
                name,
                email,
                password: hashedPassword,
                courses: courses || []
            },
            { new: true }
        );

        // Get updated user without password
        const safeUser = await User.findById(id)
            .select("-password")
            .populate("courses");

        return res.status(200).json({
            message: "User updated successfully",
            user: safeUser
        });

    } catch (error) {
        return res.status(500).json({
            message: "Error updating user",
            error: error.message
        });
    }
};


// ----- Add course to user -----
const addCourseToUser = async (req, res) => {
    try {
        // Get user id from URL and course id from body
        const { id } = req.params;
        const { courseId } = req.body;

        // Check if id is valid
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                message: "Invalid user id"
            });
        }

        // Check if courseId was sent
        if (!courseId) {
            return res.status(400).json({
                message: "courseId is required"
            });
        }

        // Check if courseId is valid
        if (!mongoose.Types.ObjectId.isValid(courseId)) {
            return res.status(400).json({
                message: "Invalid course id"
            });
        }

        // Check if user exists
        const user = await User.findById(id);

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        // Check if course exists
        const course = await Course.findById(courseId);

        if (!course) {
            return res.status(404).json({
                message: "Course not found"
            });
        }

        // Check if course is already added to user
        const alreadyAdded = user.courses.some(c => c.toString() === courseId);

        if (alreadyAdded) {
            return res.status(409).json({
                message: "Course already added to user"
            });
        }

        // Add course to user's courses array
        user.courses.push(courseId);
        await user.save();

        // Return updated user with populated courses
        const updatedUser = await User.findById(id)
            .select("-password")
            .populate("courses");

        return res.status(200).json({
            message: "Course added to user successfully",
            user: updatedUser
        });

    } catch (error) {
        return res.status(500).json({
            message: "Error adding course to user",
            error: error.message
        });
    }
};


// ----- Remove course from user -----
const removeCourseFromUser = async (req, res) => {
    try {
        // Get user id from URL and course id from body
        const { id } = req.params;
        const { courseId } = req.body;

        // Check if id is valid
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                message: "Invalid user id"
            });
        }

        // Check if courseId was sent
        if (!courseId) {
            return res.status(400).json({
                message: "courseId is required"
            });
        }

        // Check if courseId is valid
        if (!mongoose.Types.ObjectId.isValid(courseId)) {
            return res.status(400).json({
                message: "Invalid course id"
            });
        }

        // Check if user exists
        const user = await User.findById(id);

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        // Check if course exists
        const course = await Course.findById(courseId);

        if (!course) {
            return res.status(404).json({
                message: "Course not found"
            });
        }

        // Check if course is actually in user's list
        const hasCourse = user.courses.some(c => c.toString() === courseId);

        if (!hasCourse) {
            return res.status(404).json({
                message: "Course not found in user's course list"
            });
        }

        // Remove course from user's courses array
        user.courses = user.courses.filter(c => c.toString() !== courseId);
        await user.save();

        // Return updated user with populated courses
        const updatedUser = await User.findById(id)
            .select("-password")
            .populate("courses");

        return res.status(200).json({
            message: "Course removed from user successfully",
            user: updatedUser
        });

    } catch (error) {
        return res.status(500).json({
            message: "Error removing course from user",
            error: error.message
        });
    }
};


// ----- Login user -----
const loginUser = async (req, res) => {
    try {
        // Get data from request body
        const { email, password } = req.body;

        // Check required fields
        if (!email || !password) {
            return res.status(400).json({
                message: "Email and password are required"
            });
        }

        // Check correct types
        if (typeof email !== "string" || typeof password !== "string") {
            return res.status(400).json({
                message: "Email and password must be strings"
            });
        }

        // Normalize email
        const normalizedEmail = email.trim().toLowerCase();

        // Check if fields are empty after trim
        if (!normalizedEmail || !password.trim()) {
            return res.status(400).json({
                message: "Email and password cannot be empty"
            });
        }

        // Find user by email
        const user = await User.findOne({ email: normalizedEmail });

        if (!user) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }

        // Compare password with hashed password
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }

        // Return user without password
        const safeUser = await User.findById(user._id)
            .select("-password")
            .populate("courses");

        return res.status(200).json({
            message: "Login successful",
            user: safeUser
        });

    } catch (error) {
        return res.status(500).json({
            message: "Error logging in",
            error: error.message
        });
    }
};


module.exports = {createUser, getUsers, getUserById, deleteUser, updateUser, addCourseToUser, removeCourseFromUser, loginUser};