const Freelancer = require('../Models/freelancer');

const saveUserFreelancer = async (userId) => {
    const freelancer = new Freelancer({
        userId: userId
    });
    await freelancer.save();
};

module.exports = {saveUserFreelancer};