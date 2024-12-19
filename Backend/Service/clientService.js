const Client = require('../Models/client');

// Client is created when a user is registered
const saveUserClient = async (userId) => {
    const client = new Client({
        user: userId,
        companyName: "Company Name", 
        contactNumber: 0101120012      
    });
    await client.save();
};

module.exports = {saveUserClient};