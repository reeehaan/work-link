const mongoose = require("mongoose");



const freelancerSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true,
    },
        title: {
            type: String,
            default: "", 
        },
        bio: {
            type: String,
            default: "", 
        },
        skills: {
            type: [String], 
            default: [], 
        },
        portfolio: {
            type: [
                {
                    projectTitle: { type: String, required: true },
                    projectImage: { type: String, required: true }, 
                },
            ],
            default: [], 
        },
        email:{
            type: String,
            default: "", 
        },
    },
);
    
const Freelancer = mongoose.model("freelancer", freelancerSchema);
module.exports = Freelancer;