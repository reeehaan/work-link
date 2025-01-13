const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
        trim: true
    },
    skills:{
        type: [String],
        required: true,
    },
    scope: {
        projectType: {
          type: String,
          required: true,
        },
        projectDuration: {
          type: String,
          required: true,
        },
        experience: {
          type: String,
          required: true,
        },
      },
    budget:{
        type: Number,
        required: true,
    },
    description:{
        type: String,
        required: true,
        trim: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    clientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "client", 
        required: true,
    },
});

const Project = mongoose.model("project", projectSchema);

module.exports = Project;