const mongoose = require("mongoose"); //import mongoose


//Blueprint of user table(collection)
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    password: {
        type: String,
        required: true,
    },

    email: {
        type: String,
        unique: true,
        required: true,
        lowercase: true
    },

    //Array of courses saved in user
    courses: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Course"
        }
    ]  
});


//Model connect schema to a collection in db
const User = mongoose.model("User", userSchema);

//Export to use model in other files
module.exports = User;