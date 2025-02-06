const express = require('express');
const router = express.Router();
const {
  verifyToken,
  verifyClientRole,
  verifyFreelancerRole,
} = require('../Middleware/auth');

const Project = require('../Service/projectService');

// Create project (only clients can create)
router.post('/', verifyToken, verifyClientRole, Project.createProject);

// Get all projects by client ID (accessible to all authenticated users)
//use this to fetch projects that are relevent to a client
router.get('/', verifyToken, verifyClientRole, Project.getProjectsByClientId);

// Get all projects (accessible to all authenticated users)
router.get('/all', Project.getAllProjects);

// Get 5 Recent projects
router.get('/recent', verifyToken, Project.getRecentProjects);

//Get project by project ID
router.get('/:projectId', Project.getProjectByProjectId);

router.delete('/:projectId',verifyToken,verifyClientRole,Project.deleteProjectByProjectId);



module.exports = router;
