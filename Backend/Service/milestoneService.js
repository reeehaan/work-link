const Milestone = require('../Models/milestone');
const Project = require('../Models/project'); 
const Proposal = require('../Models/proposal');


const createMilestone = async (req, res) => {
    try {
        const { projectId } = req.params;
        const { title, description, dueDate, amount } = req.body;

        // Check if the proposal has been accepted for the project
        const proposal = await Proposal.findOne({ projectId: projectId, status: 'accepted' });

        if (!proposal) {
            return res.status(400).json({
                success: false,
                message: 'Proposal for this project has not been accepted yet.'
            });
        }

        // Create the milestone if the proposal is accepted
        const milestone = new Milestone({
            title,
            description,
            dueDate,
            amount,
            projectId,
            freelancerId: req.user._id, // Assuming the freelancer is logged in
        });

        await milestone.save();

        res.status(201).json({
            success: true,
            message: 'Milestone created successfully',
            data: milestone
        });

    } catch (error) {
        console.error('Error creating milestone:', error);
        res.status(500).json({
            success: false,
            message: 'Error creating milestone',
            error: error.message
        });
    }
};


// Get all milestones for a specific project
const getProjectMilestones = async (req, res) => {
    try {
        const { projectId } = req.params;
        
        const milestones = await Milestone.find({ projectId }).populate('projectId',{title: true, budget: true})
            .sort({ createdAt: 'asc' });

        res.status(200).json({
            success: true,
            data: milestones
        });

    } catch (error) {
        console.error('Error fetching milestones:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching milestones',
            error: error.message
        });
    }
};

const updateMilestone = async (req, res) => {
    try {
        const { projectId, milestoneId } = req.params;
        const { title, description, dueDate, amount, status } = req.body;
        
        // Check if the proposal has been accepted for the project
        const proposal = await Proposal.findOne({ projectId: projectId, status: 'accepted' });

        if (!proposal) {
            return res.status(400).json({
                success: false,
                message: 'Proposal for this project has not been accepted yet.'
            });
        }
        
        // Find the milestone by ID and project ID and update it
        const milestone = await Milestone.findOneAndUpdate(
            { _id: milestoneId, projectId }, 
            {
                title: title || undefined,
                description: description || undefined,
                dueDate: dueDate || undefined,
                amount: amount || undefined,
                status: status || undefined
            },
            { 
                new: true,  // This returns the updated document
                runValidators: true  // This runs model validations on update
            }
        );

        if (!milestone) {
            return res.status(404).json({
                success: false,
                message: 'Milestone not found for this project'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Milestone updated successfully',
            data: milestone
        });

    } catch (error) {
        console.error('Error updating milestone:', error);
        res.status(500).json({
            success: false,
            message: 'Error updating milestone',
            error: error.message
        });
    }
};

const deleteMilestone = async (req, res) => {
    try {
        const { projectId, milestoneId } = req.params;

        // Check if the proposal has been accepted for the project
        const proposal = await Proposal.findOne({ projectId: projectId, status: 'accepted' });

        if (!proposal) {
            return res.status(400).json({
                success: false,
                message: 'Proposal for this project has not been accepted yet.'
            });
        }

        // Find and delete the milestone by ID and project ID
        const milestone = await Milestone.findOneAndDelete({ 
            _id: milestoneId, 
            projectId 
        });

        if (!milestone) {
            return res.status(404).json({
                success: false,
                message: 'Milestone not found for this project'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Milestone deleted successfully',
            data: milestone
        });

    } catch (error) {
        console.error('Error deleting milestone:', error);
        res.status(500).json({
            success: false,
            message: 'Error deleting milestone',
            error: error.message
        });
    }
};



module.exports = {
    createMilestone,
    getProjectMilestones,
    updateMilestone,
    deleteMilestone
};