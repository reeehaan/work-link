const express = require('express');
const router = express.Router();

const Milestone = require('../Service/milestoneService');
const {
    verifyToken,
    verifyClientRole,
    verifyFreelancerRole,
  } = require('../Middleware/auth');


router.post('/create-milestone/:projectId',verifyToken , Milestone.createMilestone);

router.get('/get-milestones/:projectId',verifyToken , Milestone.getProjectMilestones);

router.put('/update-milestone/:projectId/:milestoneId',verifyToken,  Milestone.updateMilestone);

router.delete('/delete-milestone/:projectId/:milestoneId', Milestone.deleteMilestone);

module.exports = router;