//Imports
const { Router } = require("express");
const router = Router();
const { getNote, getNotes, updateNote, deleteNote, createNote } = require("../controllers/notes.controller");

//Routes
router.route("/")
    .get(getNotes)
    .post(createNote);

router.route("/:id")
    .get(getNote)
    .put(updateNote)
    .delete(deleteNote);

//Export
module.exports = router;