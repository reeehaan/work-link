const router = require("express").Router();
// const verify = require("../Services/auth");
const User = require("../Service/userService");

//Add Users To Database
router.post("/register", User.register);

//Login Users
router.post("/login", User.login);

module.exports = router;