const jwt = require("jsonwebtoken");
const User = require("../Models/user");
const bcrypt = require("bcryptjs");
//const sendEmail = require("./nodemailer");


const register = async (req, res) => {
    if(!req.body.email){
        return res.status(400).send("Invalid body");
    }
    //
    if(req.body.selectedRole !== "freelancer" && req.body.selectedRole !== "client"){
        return res.status(400).send("Invalid user role");
    }
  const emailExist = await User.findOne({ email: req.body.email });
  if (emailExist) return res.status(400).send("Email already exists");

  //hash password
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(req.body.password, salt);

  
  //create a new User
  const user = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: hashPassword,
    role: req.body.selectedRole
  });
  await user.save();
  return res.status(202).send("Successful")
};

const login = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Email Dosn't exists");
  //compare the password
  const match = await bcrypt.compare(req.body.password, user.password);
  if (!match) return res.status(400).send("Invalid Password");

  //jwtwebtoken
  //create and assign a token
  const token = jwt.sign(
    { 
        _id: user._id, 
        email: user.email,
        role: user.role
    },
    process.env.TOKEN_SECRET
  );
  res.header("auth-token", token);
  res.json(
        {
        Access_Token: token,
        email: user.email,
        role: user.role
        }
    );
};


module.exports = { register, login };