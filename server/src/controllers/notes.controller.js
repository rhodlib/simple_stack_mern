//Imports
const Note = require("../models/Note");

//Settings
const notesController = {};

//Functions
notesController.getNotes = async (req, res) => {
    try {
        const notes = await Note.find();
        if(notes){
            res.json({ notes });
        } else {
            res.status(404).send("Notes not found");
        }
    } catch (error) {
        res.status(500).send(error);
    }
};

notesController.createNote = async (req, res) => {
    const newNote = new Note(req.body);
    try {
        await newNote.save();
        res.status(200).send({ message: "Note created"})
    } catch (error) {
        res.status(500).send(error);
    }
};

notesController.getNote = async (req, res) => {
    try {
        const note = await Note.findById(req.params.id);
        res.status(200).send(note);
    } catch (error) {
        res.status(500).send(error);
    }
};

notesController.updateNote = async (req, res) => {
    const { title, content, author } = req.body;
    try {
        const noteUpdate = await Note.findOneAndUpdate({_id: req.params.id}, { title, content, author });
        res.status(200).send({message: "Note update successfully"});
    } catch (error) {
        res.status(500).send(error);
    }
};

notesController.deleteNote = async (req, res) => {
    try {
        await Note.findByIdAndDelete(req.params.id);
        res.status(200).send({message: "Note deleted successfully"});
    } catch (error) {
        res.status(500).send(error);
    }
};

//Export
module.exports = notesController;