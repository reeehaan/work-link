const express = require('express');
const router = express.Router();

const client = require('../Service/clientService');

router.put('/profile/:userId', client.updateClientProfile);

module.exports = router;
