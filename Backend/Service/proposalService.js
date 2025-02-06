const Freelancer = require('../Models/freelancer');
const Proposal = require('../Models/proposal');
const Project = require('../Models/project');
const Client = require('../Models/client');
const User = require ('../Models/user');
const Milestone = require('../Models/milestone');

const freelancerSubmitProposal = async (req, res) => {
    try {  
      const freelancer = await Freelancer.findOne({ userId: req.user._id });
      if (!freelancer) {
        return res.status(404).json({ message: "Freelancer not found" });
      }
  
      
      const proposal = new Proposal({
        description: req.body.description,
        budget: req.body.budget,
        duration: req.body.duration,
        freelancerId: freelancer._id,
        // payload
        projectId: req.body.projectId
      });
  
      
      await proposal.save();
  
      // Send success response
      res.status(201).json({
        message: "Proposal submitted successfully",
        proposal,
      });
    } catch (error) {
      console.error("Error submitting proposal:", error);
      res.status(500).json({
        message: "Internal server error",
        error: error.message,
      });
    }
  };

const getAllProposalByProjectId = async (req, res) => {
    try {
      const client = await Client.findOne({ userId: req.user._id });
      
      
      if (!client) {
        return res.status(404).send('Unable to find the client');
      }

  
      // Check if the project exists and belongs to the logged-in client
      const project = await Project.findOne({_id: req.params.projectId,clientId: client._id});
  
      if (!project) {
        return res.status(404).send('Unable to find the project');
      }
  
      const proposals = await Proposal.find({ projectId: project._id })
            .populate({
              path: 'freelancerId',
              select: 'userId email',
              populate: {
                path: 'userId',
                select: 'firstName lastName', 
              },
            })
            .populate({
              path: 'projectId',
              select: 'title', 
            });



  
      return res.status(200).json(proposals);
    } catch (error) {
      console.log(error)
      return res.status(500).send('Internal Server Error');
    }
  };

  const getAllProposalsByFreelancer = async (req, res) => {
    try {
        const freelancer = await Freelancer.findOne({ userId: req.user._id });

        if (!freelancer) {
            return res.status(404).json({ message: 'Freelancer not found' });
        }

        // Fetch all proposals submitted by the freelancer along with project details
        const proposals = await Proposal.find({ freelancerId: freelancer._id })
        .populate('projectId', { title: true}).sort({createdAt : -1});

        if (!proposals.length) {
            return res.status(404).json({ message: 'No proposals found' });
        }

        res.status(200).json(proposals);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};


const deleteProposal = async (req, res) => {
  try {
      // Find the freelancer by their userId
      const freelancer = await Freelancer.findOne({ userId: req.user._id });
      if (!freelancer) {
          return res.status(404).json({ message: "Freelancer not found" });
      }

      // Find the proposal by its ID and ensure it belongs to the logged-in freelancer
      const proposal = await Proposal.findOne({ _id: req.params.proposalId, freelancerId: freelancer._id });
      if (!proposal) {
          return res.status(404).json({ message: "Proposal not found or doesn't belong to the freelancer" });
      }

      // Delete the proposal
      await proposal.deleteOne();

      // Send success response
      return res.status(200).json({ message: "Proposal deleted successfully" });
  } catch (error) {
      console.error("Error deleting proposal:", error);
      return res.status(500).json({
          message: "Internal server error",
          error: error.message,
      });
  }
};

const acceptProposal = async (req, res) => {
  const { proposalId } = req.params; 

  try {
    
    const proposal = await Proposal.findByIdAndUpdate(
      proposalId,
      { status: 'accepted' }, 
      { new: true } // Returns the updated document
    );

    if (!proposal) {
      return res.status(404).json({ message: 'Proposal not found' });
    }
    

    res.status(200).json({ message: 'Proposal accepted successfully', proposal });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating proposal status' });
  }
};


const rejectProposal = async (req, res) => {
  const { proposalId } = req.params; 

  try {
    
    const proposal = await Proposal.findByIdAndUpdate(
      proposalId,
      { status: 'rejected' }, 
      { new: true } // Returns the updated document
    );

    if (!proposal) {
      return res.status(404).json({ message: 'Proposal not found' });
    }
    const projectId = proposal.projectId;

    

    res.status(200).json({ message: 'Proposal rejected successfully', proposal });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating proposal status' });
  }
};




  module.exports = {
    freelancerSubmitProposal,
    getAllProposalByProjectId,
    getAllProposalsByFreelancer,
    deleteProposal,
    acceptProposal,
    rejectProposal,
    
  };