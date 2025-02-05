const mongoose = require("mongoose");

const proposalSchema = new mongoose.Schema({
  description: {
    type: String,
    default: "",
  },
  budget: {
    type: Number,
    default: 0, 
  },
  duration: {
    type: String,
    default: "",
  },
  status: {
    type: String,
    enum: ["pending", "accepted", "rejected"], 
    default: "pending", 
  },
  freelancerId: 
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "freelancer",
      required: true,
    },
  projectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "project",
    required: true,
  },
  
});

const Proposal = mongoose.model("Proposal", proposalSchema);
module.exports = Proposal;
