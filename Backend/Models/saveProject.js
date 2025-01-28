const mongoose = require("mongoose");

const saveProjectSchema = new mongoose.Schema({
    userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user", 
            required: true,
        },
    
    projectId: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "project", 
            required: true,
        }],
});

const SaveProject = mongoose.model("saveProject", saveProjectSchema);

module.exports = SaveProject;