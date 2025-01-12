const router = require("express").Router();

const User = require("../Service/userService");

//Add Users To Database
router.post("/register", User.register);

//Login Users
router.post("/login", User.login);

router.get("/:id",User.getUserById);

module.exports = router;