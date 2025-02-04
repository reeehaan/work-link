const express = require('express');
const router = express.Router();

const {
    verifyToken,
    verifyClientRole,
    verifyFreelancerRole,
  } = require('../Middleware/auth');

const Proposal = require('../Service/proposalService');

router.post('/', verifyToken, Proposal.freelancerSubmitProposal);

router.get('/:projectId', verifyToken, Proposal.getAllProposalByProjectId);

module.exports = router;