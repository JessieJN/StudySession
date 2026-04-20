const mongoose = require("mongoose"); //import mongoose


//Blueprint of studysession table(collection)
const sessionSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
        required: true
     },

    date: {
        type: Date,
        default: Date.now
    },

    durationMinutes: {
        type: Number,
        min: 0,
        required: true
    },

    focusLevel: {
        type: Number,
        min: 1,
        max: 5,
        required: true
    },

    studyMethod: {
        type: String,
        enum: ["reading", "coding", "video", "lecture", "exercises", "other"],
        required: true
    },

    notes: {
        type: String
    }
});


//Model connect schema to a collection in db
const StudySession = mongoose.model("StudySession", sessionSchema);

//Export to use model in other files
module.exports = StudySession;