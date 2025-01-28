const Freelancer = require('../Models/freelancer');
const SaveProject = require('../Models/saveProject');

const saveUserFreelancer = async (userId) => {
    const freelancer = new Freelancer({
        userId: userId
    });
    await freelancer.save();
};


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

const getSavedProject = async (req, res) => {
    const {userId} = req.params;
    const savedProject = await SaveProject.find({userId: userId}).populate(["projectId"])
    res.status(200).send(savedProject);
}



module.exports = {saveUserFreelancer,freelancerSaveProject, getSavedProject};