//Imports
const mongoose = require("mongoose");

//DB connection
const URI = process.env.MONGODB_URI 
    ? process.env.MONGODB_URI 
    : "mongodb://localhost/dbtest";

mongoose.connect(URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: true
});

//DB responses
const connection = mongoose.connection;

connection.once("open", () => console.log("DB is connected"));