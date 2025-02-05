const mongoose = require('mongoose');

const milestoneSchema = new mongoose.Schema({
    title: { 
        type: String, 
        required: true, 
        trim: true 
    },
    description: { 
        type: String, 
        trim: true 
    },
    dueDate: { 
        type: Date, 
        required: true 
    },
    amount: { 
        type: Number, 
        required: true, 
        min: 0 
    },
    status: { 
        type: String, 
        enum: ['Pending', 'In Progress', 'Completed', 'Approved', 'Cancelled'], 
        default: 'Pending' 
    },
    createdAt: { 
        type: Date, 
        default: Date.now 
    },
    updatedAt: { 
        type: Date, 
        default: Date.now 
    },
    projectId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'project', 
        required: true 
    },
    freelancerId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'user', 
        required: true 
    },
}, { timestamps: true });

const Milestone = mongoose.model("milestone", milestoneSchema);
module.exports = Milestone;