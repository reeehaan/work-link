const Client = require('../Models/client');

// Client is created when a user is registered
const saveUserClient = async (userId) => {
    const client = new Client({
        userId: userId,    
    });
    await client.save();
};

module.exports = {saveUserClient};