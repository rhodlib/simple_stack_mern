//Imports
const express = require("express");
const cors = require("cors");
const app = express();
const userRoutes = require("./routes/users");
const noteRoutes = require("./routes/notes");

//Settings
app.set("port", process.env.PORT || 4000);

//Middlewares
app.use(cors());
app.use(express.json());

//Routes
app.use("/api/users", userRoutes);
app.use("/api/notes", noteRoutes);

//Export
module.exports = app;