//Imports
const { Router } = require("express");
const router = Router();
const { getUsers, createUser, deleteUser } = require("../controllers/users.controller");

//Routes
router.route("/")
    .get(getUsers)
    .post(createUser);

router.route("/:id")
    .delete(deleteUser);

//Export
module.exports = router;