const Freelancer = require('../Models/freelancer');
const Proposal = require('../Models/proposal');
const Project = require('../Models/project');
const Client = require('../Models/client');
const User = require ('../Models/user');

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
        return res.status(404).send('Unable to find the projects');
      }
  
      // Check if the project exists and belongs to the logged-in client
      const project = await Project.findOne({
        _id: req.params.projectId,
        clientId: client._id,
      });
      console.log(project);
  
      if (!project) {
        return res.status(404).send('Unable to find the project');
      }
  
      const proposals = await Proposal.find({ projectId: project._id })
            .populate({
              path: 'freelancerId',
              select: 'userId email',
              populate: {
                path: 'userId',
                select: 'firstName lastName', // Select fields from User model
              },
            })
            .populate({
              path: 'projectId',
              select: 'title', // Select the title of the project
            });



  
      return res.status(200).json(proposals);
    } catch (error) {
      return res.status(500).send('Internal Server Error');
    }
  };


  module.exports = {
    freelancerSubmitProposal,
    getAllProposalByProjectId
  };