//Imports
require("dotenv").config();
const app = require("./app");
require("./db/mongoose");

//Server functions
async function main () {
    await app.listen(4000);
    console.log("Server on port 4000");
}

//Server listen
main();