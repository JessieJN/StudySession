const mongoose = require("mongoose"); //import mongoose


//Blueprint of course table
const courseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    code: {
        type: String,
        unique: true,
        required: true,
        lowercase: true
    },

    program: {
        type: String
    },

    semester: {
        type: String
    },

    credits: {
        type: Number,
        required: true
    }
});


//Model connect schema to a collection in db
const Course = mongoose.model("Course", courseSchema);

//Export to use model in other files
module.exports = Course;