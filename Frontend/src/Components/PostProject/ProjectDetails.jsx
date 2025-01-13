import  { useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { 
  Box,
  Typography,
  Paper,
  Chip,
  Stack,
  Container,
  Button,
  Alert,
} from "@mui/material";

const ProjectDetails = ({ 
  projectTitle = "Untitled Project",
  selectedSkills = [],
  projectType = "Not Specified",
  projectDuration = "Not Specified",
  experienceLevel = "Not Specified",
  budget = 0,
  description = "No description provided.",
}) => {
  const [message, setMessage] = useState(null); // To store success or error message
  const [severity, setSeverity] = useState(null); // To set the message type (success or error)

  const createProject = async () => {
    try {
      const projectData = {
        title: projectTitle,
        skills: selectedSkills,
        scope: {
          projectType: projectType,
          projectDuration: projectDuration,
          experience: experienceLevel,
        },
        budget: budget,
        description: description,
      };

      const apiUrl = "http://localhost:3000/api/project"; 
      const accessToken = localStorage.getItem("accessToken");
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      };

      // Make the POST request
      await axios.post(apiUrl, projectData, config);

      // Show success message
      setMessage("Project posted successfully!");
      setSeverity("success");
    } catch (error) {
      // Show error message
      const errorMessage = error.response?.data?.message || "Failed to post the project.";
      setMessage(errorMessage);
      setSeverity("error");
    }
  };

  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ p: 4, mt: 4 ,position: "relative" }}>
        <Typography variant="h4" gutterBottom>
          Project Details
        </Typography>

        <Stack spacing={3}>
          <Box>
            <Typography variant="h6" color="primary" gutterBottom>
              Title
            </Typography>
            <Typography variant="body1">
              {projectTitle}
            </Typography>
          </Box>

          <Box>
            <Typography variant="h6" color="primary" gutterBottom>
              Required Skills
            </Typography>
            <Stack direction="row" spacing={1} flexWrap="wrap" gap={1}>
              {selectedSkills.map((skill, index) => (
                <Chip 
                  key={index}
                  label={skill}
                  variant="outlined"
                  color="primary"
                />
              ))}
            </Stack>
          </Box>

          <Box>
            <Typography variant="h6" color="primary" gutterBottom>
              Project Scope
            </Typography>
            <Stack spacing={1}>
              <Box display="flex" gap={1}>
                <Typography variant="subtitle1" fontWeight="bold">
                  Type:
                </Typography>
                <Typography variant="body1">
                  {projectType}
                </Typography>
              </Box>
              <Box display="flex" gap={1}>
                <Typography variant="subtitle1" fontWeight="bold">
                  Duration:
                </Typography>
                <Typography variant="body1">
                  {projectDuration}
                </Typography>
              </Box>
              <Box display="flex" gap={1}>
                <Typography variant="subtitle1" fontWeight="bold">
                  Experience Level:
                </Typography>
                <Typography variant="body1">
                  {experienceLevel}
                </Typography>
              </Box>
            </Stack>
          </Box>

          <Box>
            <Typography variant="h6" color="primary" gutterBottom>
              Budget
            </Typography>
            <Typography variant="body1">
              ${budget}
            </Typography>
          </Box>

          <Box>
            <Typography variant="h6" color="primary" gutterBottom>
              Description
            </Typography>
            <Typography variant="body1">
              {description}
            </Typography>
          </Box>

          
          <Box>
            <Button 
              variant="contained" 
              color="primary" 
              size="large"
              onClick={createProject}
            >
              Post This Project
            </Button>
          </Box>

          {message && (
            <Box>
              <Alert severity={severity} onClose={() => setMessage(null)}>
                {message}
              </Alert>
            </Box>
          )}

        </Stack>
      </Paper>
    </Container>
  );
};

ProjectDetails.propTypes = {
  projectTitle: PropTypes.string.isRequired,
  selectedSkills: PropTypes.arrayOf(PropTypes.string).isRequired,
  projectType: PropTypes.string.isRequired,
  projectDuration: PropTypes.string.isRequired,
  experienceLevel: PropTypes.string.isRequired,
  budget: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  description: PropTypes.string.isRequired,
};

export default ProjectDetails;
