require("dotenv").config();
const jwt = require("jsonwebtoken");
const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
require("./Database/mongodb.js");


//import routes
const users = require("./Routes/user-route");
const project = require("./Routes/project-route")
const freelancer = require("./Routes/freelancer-route");
const client = require("./Routes/client-route");
const proposal = require("./Routes/proposal-route.js");
const milestone = require("./Routes/milestone-route.js");


//middleware
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cors()
);
//Routes Middlewares
 app.use("/api/user",users);
 app.use("/api/project", project);
 app.use("/api/freelancer", freelancer);
 app.use("/api/client", client);
 app.use("/api/proposal", proposal);
 app.use("/api/milestone", milestone)


const port = process.env.PORT;
const server = app.listen(port, () =>
  console.log("server started in port", { port })
);