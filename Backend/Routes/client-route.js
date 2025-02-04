const express = require('express');
const router = express.Router();

const client = require('../Service/clientService');

router.put('/profile/:userId', client.updateClientProfile);

router.delete('/project/:projectId', client.deleteProjectByProjectId);

module.exports = router;