import PropTypes from "prop-types";
import { 
  Box,
  Typography,
  Paper,
  Chip,
  Stack,
  Container,
} from '@mui/material';

const ProjectDetails = ({ 
  projectTitle = "Untitled Project",
  selectedSkills = [],
  projectType = "Not Specified",
  projectDuration = "Not Specified",
  experienceLevel = "Not Specified",
  budget = 0,
  description = "No description provided.",
}) => {
  return (
    <Container maxWidth="md">
      <Paper elevation={0} sx={{ p: 4, mt: 4 }}>
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