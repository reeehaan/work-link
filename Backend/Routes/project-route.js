const express = require('express');
const router = express.Router();
const { verifyToken, verifyClientRole, verifyFreelancerRole } = require('../Middleware/auth');

const Project = require('../Service/projectService')

// Create project (only clients can create)
router.post('/', verifyToken, verifyClientRole, Project.createProject);

// Get projects by client ID (accessible to all authenticated users)
router.get('/client/:clientId', verifyToken, Project.getProjectsByClientId);

// Get all projects (accessible to all authenticated users)
router.get('/all', verifyToken, Project.getAllProjects);

// Get 5 Recent projects
router.get('/recent', verifyToken, Project.getRecentProjects);



module.exports = router;