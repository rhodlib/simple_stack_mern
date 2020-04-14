//Imports
const { Schema, model } = require("mongoose");

//Schema
const userModel = new Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        unique: true
    }
}, {
    timestamps: true
});

const User = model("User", userModel);

//Export
module.exports = User;