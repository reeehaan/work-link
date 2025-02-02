const Project = require('../Models/project');
const Client = require('../Models/client');

const createProject = async (req, res) => {
    // Get client record using user ID from JWT token
    const client = await Client.findOne({ userId: req.user._id });
    if(!client) {
        return null;
    }
    const project = new Project({
        title: req.body.title,
        skills: req.body.skills,
        scope: {
            projectType: req.body.scope.projectType,
            projectDuration: req.body.scope.projectDuration,
            experience: req.body.scope.experience
        },
        budget: req.body.budget,
        description: req.body.description,
        clientId: client._id
    });

    await project.save();
    res.status(201).send(project);
};

const getProjectsByClientId = async (req, res) => {
    // Get client record using user ID from JWT token
    const client = await Client.findOne({ userId: req.user._id});
    
    if(client){
        const projects = await Project.find({ clientId: client._id})
        res.status(201).send(projects);
    }else{
        res.status(404).send("There are not projects related to this client")
    }
    
};

const getAllProjects = async (req, res) => {
    const projects = await Project.find()
        .populate('clientId').sort({createdAt:-1}); // This will also include company name from client

    res.send(projects);
};

//Get project by projectId 
const getProjectByProjectId = async (req, res) => {
    const { projectId } = req.params; // Get projectId from the URL params

    const project = await Project.findById(projectId)
        .populate('clientId');
    if (!project) {
        return res.status(404).send("Project not found");
    }

    res.send(project);
};
// This will include 5 recent projects
const getRecentProjects = async (req, res) => {
    const projects = await Project.find()
        .populate('clientId').sort({createdAt:-1}).limit(5); 

    res.send(projects);
};





module.exports = {
    createProject,
    getProjectsByClientId,
    getAllProjects,
    getRecentProjects,
    getProjectByProjectId
};