const Client = require('../Models/client');
const User = require("../Models/user");

// Client is created when a user is registered
const saveUserClient = async (userId) => {
    const client = new Client({
        userId: userId,    
    });
    await client.save();
};

const updateClientProfile = async (req, res) =>{
    try{
        const { userId } = req.params;

        const user = await User.findByIdAndUpdate(
            userId,
            {
                image: req.body.image
            },
            { new: true}
        );

        if(!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        const updatedClient = await Client.findOneAndUpdate(
            {userId},
            {
                $set: {
                    companyName: req.body.companyName,
                    contactNumber: req.body.contactNumber,
                    email: req.body.email
                }
            },
            {new: true}
        );

        if(!updatedClient){
            return res.status(404).json({message: "Client not found"});
        }

        res.status(200).json({
            id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            role: user.role,
            image: user.image,
            clientProfile: {
                companyName: updatedClient.companyName,
                contactNumber: updatedClient.contactNumber,
                email: updatedClient.email
            }
        });
    }catch (error){
        console.error('Error updating client:', error);
        res.status(500).json({ message: "Error updating profile", error: error.message});
    }
};



 
module.exports = {saveUserClient,updateClientProfile};