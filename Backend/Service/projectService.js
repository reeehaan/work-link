const Project = require('../Models/project');
const Client = require('../Models/client');

const createProject = async (req, res) => {
    // Get client record using user ID from JWT token
    const client = await Client.findOne({ user: req.user._id });
    
    const project = new Project({
        title: req.body.title,
        skills: req.body.skills,
        scope: {
            projectScope: req.body.scope.projectScope,
            projectDuration: req.body.scope.projectDuration,
            experience: req.body.scope.experience
        },
        budget: req.body.budget,
        description: req.body.description,
        client: client._id
    });

    await project.save();
    res.status(201).send(project);
};

const getProjectsByClientId = async (req, res) => {
    const projects = await Project.find({ client: req.params.clientId });
    res.send(projects);
};

const getAllProjects = async (req, res) => {
    const projects = await Project.find()
        .populate('client', 'companyName'); // This will also include company name from client

    res.send(projects);
};

module.exports = {
    createProject,
    getProjectsByClientId,
    getAllProjects
};