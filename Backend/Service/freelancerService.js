const Freelancer = require('../Models/freelancer');
const User = require("../Models/user");
const SaveProject = require('../Models/saveProject');


const saveUserFreelancer = async (userId) => {
    const freelancer = new Freelancer({
        userId: userId
    });
    await freelancer.save();
};


const isProjectLiked = async (req, res) => {
    try {
        const {userId, projectId} = req.params;
        const result = await SaveProject.findOne({
            userId, 
            projectId: { $in: [projectId] } 
        });

        if(result){
            res.status(200).send({projectIsLiked: true});
       }
        else {
            res.status(200).send({projectIsLiked:false})
    }            
    } 
    catch (error) {
    }
}


const freelancerSaveProject = async (req, res) => {
    try {
        const {userId, projectId} = req.params;
        const result = await SaveProject.findOneAndUpdate(
            { userId: userId }, // Find the document by userId
            {
                $addToSet: { projectId: projectId }, // Add projectId to the array, avoiding duplicates
            },
            {
                new: true,  // Return the updated document
                upsert: true,  // If no document matches, create a new one
            }
        );
        
        console.log("Project saved or updated:", result);

        res.status(200).send(result);
    } catch (error) {
        console.error("Error saving/updating project:", error);
    }
};

const updateFreelancerProfile = async (req, res) => {
    try {
        const { userId } = req.params;

        // First update the User model for image 
        const user = await User.findByIdAndUpdate(
            userId,
            { 
                image: req.body.image
            },
            { new: true }
        );

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Update the Freelancer model with profile details
        const updatedFreelancer = await Freelancer.findOneAndUpdate(
            { userId },
            {
                $set: {
                    title: req.body.title,
                    bio: req.body.bio,
                    skills: req.body.skills,
                    portfolio: req.body.portfolio,
                    email: req.body.email
                }
            },
            { new: true }
        );

        if (!updatedFreelancer) {
            return res.status(404).json({ message: "Freelancer not found" });
        }

        // Return combined response
        res.status(200).json({
            id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            role: user.role,
            image: user.image,
            freelancerProfile: {
                title: updatedFreelancer.title,
                bio: updatedFreelancer.bio,
                skills: updatedFreelancer.skills,
                portfolio: updatedFreelancer.portfolio,
                email: updatedFreelancer.email
            }
        });

    } catch (error) {
        console.error('Error updating freelancer profile:', error);
        res.status(500).json({ message: "Error updating profile", error: error.message });
    }
};


const freelancerDeleteSavedProject = async (req, res) => {
    try {
        const { userId, projectId } = req.params;
        
        const result = await SaveProject.findOneAndUpdate(
            { userId: userId },
            {
                $pull: { projectId: projectId } 
            },
            {
                new: true 
            }
        );

        if (!result) {
            return res.status(404).json({ message: "No saved projects found for this user" });
        }
        res.status(200).json(result);

    } catch (error) {
        console.error("Error removing saved project:", error);
        res.status(500).json({ message: "Error removing project from saved list", error: error.message });
    }
};

const getSavedProject = async (req, res) => {
    const {userId} = req.params;
    const savedProject = await SaveProject.find({userId: userId}).populate(["projectId"])
    res.status(200).send(savedProject);
};





module.exports = {
    saveUserFreelancer,
    freelancerSaveProject, 
    getSavedProject, 
    isProjectLiked, 
    freelancerDeleteSavedProject, 
    updateFreelancerProfile,
    
};