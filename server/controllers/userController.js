// logic + imports User + creates/fetches users in db

const User = require("../models/User");


// ----- Create user -----
const createUser = async (req, res) => {
    try {
        // Get data from request body
        const { name, email, password, courses } = req.body;

        // Check required fields
        if (!name || !email || !password) {
            return res.status(400).json({
                message: "Name, email and password are required"
            });
        }

        // Check duplicate email
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(409).json({
                message: "A user with this email already exists"
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

        // Create new user in db
        const newUser = await User.create({
            name,
            email,
            password,
            courses: courses || []
        });

        // Send response message
        return res.status(201).json({
            message: "User created successfully",
            user: newUser
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
        const users = await User.find().populate("courses");

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

        // Find user by id
        const user = await User.findById(id).populate("courses");

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

module.exports = {createUser, getUsers, getUserById};