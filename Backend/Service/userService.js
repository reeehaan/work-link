const jwt = require("jsonwebtoken");
const User = require("../Models/user");
const bcrypt = require("bcryptjs");

const Client = require("./clientService");
const Freelancer = require("./freelancerService");


const FreelancerModel = require('../Models/freelancer');
const ClientModel = require('../Models/client');

const register = async (req, res) => {
  try{
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
    image: " ",
    role: req.body.selectedRole,
  });
  const savedUser = await user.save();

  if(req.body.selectedRole === "client"){
    Client.saveUserClient(savedUser._id)
  }
  
  if(req.body.selectedRole === "freelancer"){
    Freelancer.saveUserFreelancer(savedUser._id)
  }

  return res.status(202).send("Successful");
  }
  catch(err){
    console.log("error", err);
    return res.status(400).send("Invalid body");
  }
    
};



const login = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send({error: "Invalid Email or Password"});
  //compare the password
  const match = await bcrypt.compare(req.body.password, user.password);
  if (!match) return res.status(400).send({error: "Invalid Email or Password"});

  //jwtwebtoken
  //create and assign a token
  const token = jwt.sign(
    { 
        _id: user._id, 
        email: user.email,
        role: user.role,
        exp: Math.floor(Date.now()/1000 + (1 * 24 * 60 * 60))
    },
    process.env.TOKEN_SECRET
  );
  res.header("auth-token", token);
  res.json(
        {
          token,
        email: user.email,
        role: user.role
        }
    );
};

//retrieve user from User schema by their ID
const getUserById = async (req, res) => {
  try {
      const { id } = req.params;

      // Fetch user by ID
      const user = await User.findById(id);

      if (!user) {
          return res.status(404).json({ message: "User not found" });
      }

      let response = {
          id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          role: user.role,
          image: user.image || null,
      };

      // If the user is a freelancer, fetch their profile details
      if (user.role === "freelancer") {
          const freelancerProfile = await FreelancerModel.findOne({ userId: user._id });

          if (freelancerProfile) {
              response.freelancerProfile = {
                  title: freelancerProfile.title,
                  bio: freelancerProfile.bio,
                  skills: freelancerProfile.skills,
                  portfolio: freelancerProfile.portfolio,
                  email: freelancerProfile.email,
              };
          }
      }
      // If the user is a client, fetch their profile details
      if (user.role === "client") {
        const ClientProfile = await ClientModel.findOne({ userId: user._id });

        if (ClientProfile) {
            response.ClientProfile = {
                companyName: ClientProfile.companyName,
                contactNumber: ClientProfile.contactNumber,
                email: ClientProfile.email,        
            };
        }
    }

      // Return the response
      return res.status(200).json(response);
  } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "An error occurred", error: error.message });
  }
};
module.exports = { register, login, getUserById};