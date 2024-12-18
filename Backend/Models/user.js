const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  role: {type: String, required: true},
  image: { type: String, required: false },
});

const User = mongoose.model("user", userSchema);

module.exports = User;