//Imports
const User = require("../models/User");

//Settings
const usersController = {};

//Functions
usersController.getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).send(users);
    } catch (error) {
        res.status(500).send(error);
    } 
};

usersController.createUser = async (req, res) => {
    const { username } = req.body;
    const newUser = new User({username});
    try {
        await newUser.save();
        res.status(200).send({ message: "User saved correctly"});
    } catch (error) {
        res.status(500).send(error);
    }
};

usersController.deleteUser = async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.status(200).send({ message: "User deleted successfully"});
    } catch (error) {
        res.status(500).send(error);
    }
};

//Export
module.exports = usersController;