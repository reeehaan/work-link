const express = require('express');
const router = express.Router();

const {
    verifyToken,
    verifyClientRole,
    verifyFreelancerRole,
  } = require('../Middleware/auth');

const Proposal = require('../Service/proposalService');

router.post('/', verifyToken, Proposal.freelancerSubmitProposal);

router.get('/:projectId',verifyToken, Proposal.getAllProposalByProjectId);

router.get('/freelancer/proposals', verifyToken, verifyFreelancerRole, Proposal.getAllProposalsByFreelancer);

router.delete('/delete-proposal/:proposalId', verifyToken,verifyFreelancerRole, Proposal.deleteProposal);

router.patch('/accept/:proposalId',verifyToken,verifyClientRole,Proposal.acceptProposal);

router.patch('/reject/:proposalId',verifyToken,verifyClientRole,Proposal.rejectProposal);




module.exports = router;