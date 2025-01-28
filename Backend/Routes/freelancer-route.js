const express = require('express');
const router = express.Router();

const Freelancer = require('../Service/freelancerService');


router.post("/save-project/:userId/:projectId",Freelancer.freelancerSaveProject);
router.get("/save-project/:userId", Freelancer.getSavedProject);

module.exports = router;