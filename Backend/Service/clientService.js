const Client = require('../Models/client');
const User = require('../Models/user');

// Client is created when a user is registered
const saveUserClient = async (userId) => {
  const client = new Client({
    userId: userId,
  });
  await client.save();
};

const updateClientProfile = async (req, res) => {
  try {
    console.log('Updating Client Profile');
    const { userId } = req.params;

    const validUser = await User.findById(userId);

    if (!validUser) {
      return res.status(404).json({
        message: 'User not found',
      });
    }

    const user = await User.updateOne(
      { id: userId },
      {
        image: req.body.image,
      }
    );

    const updatedClient = await Client.findOneAndUpdate(
      { userId },
      {
        $set: {
          companyName: req.body.companyName,
          contactNumber: req.body.contactNumber,
          email: req.body.email,
        },
      },
      { new: true }
    );

    if (!updatedClient) {
      return res.status(404).json({ message: 'Client not found' });
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
        email: updatedClient.email,
      },
    });
  } catch (error) {
    console.error('Error updating client:', error);
    res
      .status(500)
      .json({ message: 'Error updating profile', error: error.message });
  }
};

const deleteProjectByProjectId = async (req, res) => {
  try {
    //Get client record using user ID from JWT token
    const client = await Client.findOne({ userId: req.user._id });

    if (client) {
      // Check if the project exists and belongs to the logged-in client
      const project = await Project.findOne({
        _id: req.params.projectId,
        clientId: client._id,
      });

      if (project) {
        //Delete the project if it's found
        await Project.findByIdAndDelete(req.params.projectId);
        res.status(200).send('Project deleted successfully');
      } else {
        res.status(404).send('Project not found or not owned by the client');
      }
    } else {
      res.status(404).send('Client not found');
    }
  } catch (error) {
    console.error('Error deleting project:', error);
    res.status(500).send('Internal server error');
  }
};

 

 
module.exports = {
  saveUserClient,
  updateClientProfile,
  deleteProjectByProjectId,
};
