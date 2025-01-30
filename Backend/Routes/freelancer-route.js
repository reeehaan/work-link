const express = require('express');
const router = express.Router();

const Freelancer = require('../Service/freelancerService');


router.put('/profile/:userId', Freelancer.updateFreelancerProfile)
router.post("/save-project/:userId/:projectId",Freelancer.freelancerSaveProject);
router.get("/save-project/:userId", Freelancer.getSavedProject);
router.get("/save-project/:userId/:projectId", Freelancer.isProjectLiked)
router.delete("/save-project/:userId/:projectId", Freelancer.freelancerDeleteSavedProject)

module.exports = router;