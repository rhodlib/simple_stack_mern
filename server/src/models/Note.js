//Imports
const { Schema, model } = require("mongoose");

//Schema
const noteSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    author: String,
    date: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

const Note = model("Note", noteSchema);

//Export
module.exports = Note;