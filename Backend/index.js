require("dotenv").config();
const jwt = require("jsonwebtoken");
const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
require("./Database/mongodb.js");


//import routes
const users = require("./Routes/user-route");

// const message = require("./Routes/message");
//middleware
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cors()
);
//Routes Middlewares
 app.use("/api/user",users);

const port = process.env.PORT;
const server = app.listen(port, () =>
  console.log("server started in port", { port })
);