import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from './postedProject.module.css';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Box,
  Typography,
  Chip,
  Paper,
  Stack,
  IconButton,
} from '@mui/material';
import { Close as CloseIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { Notifications as BellIcon } from '@mui/icons-material';


const PostedProjects = () => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editedProject, setEditedProject] = useState(null);
  const [allSkills, setAllSkills] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchProjects();
    fetchSkills();
  }, []);

  const fetchProjects = async () => {
    try {
      const apiUrl = 'http://localhost:3000/api/project';
      const accessToken = localStorage.getItem('accessToken');
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      };
      const response = await axios.get(apiUrl, config);
      setProjects(response.data);
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  };

  const handleDeleteProject = async (projectId) => {
    try {
      const apiUrl = `http://localhost:3000/api/project/${projectId}`;
      const accessToken = localStorage.getItem('accessToken');
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      };
      const response = await axios.delete(apiUrl, config);
      console.log(response);
      setEditedProject(null);
      fetchProjects();
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  };

  const handleSaveChanges = async () => {
    console.log('handle');
  };

  const fetchSkills = async () => {
    try {
      const response = await fetch('/skills.json');
      if (!response.ok)
        throw new Error(`Failed to fetch skills: ${response.statusText}`);
      const data = await response.json();
      setAllSkills(data.skills || []);
    } catch (error) {
      console.error('Error fetching skills:', error);
    }
  };

  const openEditModal = (project) => {
    setEditedProject({ ...project });
    console.log('editedProject', editedProject);
    setModalOpen(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedProject((prev) => ({ ...prev, [name]: value }));
  };

  const handleScopeChange = (e) => {
    const { name, value } = e.target;
    setEditedProject((prev) => ({
      ...prev,
      scope: { ...prev.scope, [name]: value },
    }));
  };

  const handleAddSkill = (skill) => {
    if (!editedProject.skills.includes(skill)) {
      setEditedProject((prev) => ({
        ...prev,
        skills: [...prev.skills, skill],
      }));
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    setEditedProject((prev) => ({
      ...prev,
      skills: prev.skills.filter((skill) => skill !== skillToRemove),
    }));
  };

  const handleBellClick = (projectId) =>{
    navigate(`/view-proposal/${projectId}`);
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Posted Projects</h2>
      <div className={styles.grid}>
        {projects.map((project) => (
          <div
            key={project._id}
            className={styles.card}
            onClick={() => openEditModal(project)}
          >
            <h3 className={styles.projectTitle}>{project.title}</h3>
            <p>
              <strong>Type:</strong> {project.scope.projectType}
            </p>
            <p>
              <strong>Duration:</strong> {project.scope.projectDuration}
            </p>
            <p>
              <strong>Experience:</strong> {project.scope.experience}
            </p>
            <p>
              <strong>Description:</strong> {project.description}
            </p>
            <div className={styles.skills}>
              <p>
                <strong>Skills:</strong>
              </p>
              <div className={styles.skillList}>
                {project.skills.map((skill, index) => (
                  <span key={index} className={styles.skillBadge}>
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            <p className={styles.budget}>Budget: $ {project.budget}</p>
            <IconButton onClick={() => handleBellClick(project._id)} color="primary">
                        <BellIcon />
            </IconButton>
          </div>
        ))}
       
      </div>

      {modalOpen && editedProject && (
        <Dialog
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          maxWidth='md'
          fullWidth
        >
          <DialogTitle
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              mb: 2,
            }}
          >
            <Typography variant='h5' component='div'>
              Edit Project
            </Typography>
            <IconButton onClick={() => setModalOpen(false)}>
              <CloseIcon />
            </IconButton>
          </DialogTitle>

          <DialogContent dividers>
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
                gap: 4,
              }}
            >
              {/* Left Section */}
              <Stack spacing={3}>
                <TextField
                  fullWidth
                  label='Title'
                  name='title'
                  value={editedProject.title || ''}
                  onChange={handleInputChange}
                  variant='outlined'
                />

                <TextField
                  fullWidth
                  label='Description'
                  name='description'
                  value={editedProject.description || ''}
                  onChange={handleInputChange}
                  multiline
                  rows={4}
                  variant='outlined'
                />
              </Stack>

              {/* Right Section */}
              <Stack spacing={3}>
                <FormControl>
                  <FormLabel>Project Type</FormLabel>
                  <RadioGroup
                    name='projectType'
                    value={editedProject.scope?.projectType || ''}
                    onChange={handleScopeChange}
                    row
                  >
                    {['Small', 'Medium', 'Large'].map((type) => (
                      <FormControlLabel
                        key={type}
                        value={type}
                        control={<Radio />}
                        label={type.charAt(0).toUpperCase() + type.slice(1)}
                      />
                    ))}
                  </RadioGroup>
                </FormControl>

                <FormControl>
                  <FormLabel>Project Duration</FormLabel>
                  <RadioGroup
                    name='projectDuration'
                    value={editedProject.scope?.projectDuration || ''}
                    onChange={handleScopeChange}
                  >
                    {[
                      'More than 6 months',
                      '3 to 6 months',
                      '1 to 3 months',
                    ].map((duration) => (
                      <FormControlLabel
                        key={duration}
                        value={duration}
                        control={<Radio />}
                        label={duration}
                      />
                    ))}
                  </RadioGroup>
                </FormControl>

                <FormControl>
                  <FormLabel>Experience Level</FormLabel>
                  <RadioGroup
                    name='experience'
                    value={editedProject.scope?.experience || ''}
                    onChange={handleScopeChange}
                    row
                  >
                    {['Entry', 'Intermediate', 'Expert'].map((level) => (
                      <FormControlLabel
                        key={level}
                        value={level}
                        control={<Radio />}
                        label={level.charAt(0).toUpperCase() + level.slice(1)}
                      />
                    ))}
                  </RadioGroup>
                </FormControl>

                <Box>
                  <FormLabel>Skills</FormLabel>
                  <TextField
                    fullWidth
                    placeholder='Search skills...'
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    size='small'
                    sx={{ mt: 1, mb: 1 }}
                  />

                  {searchTerm && (
                    <Paper
                      elevation={3}
                      sx={{
                        mt: 1,
                        maxHeight: 200,
                        overflow: 'auto',
                        p: 1,
                      }}
                    >
                      {allSkills
                        .filter((skill) =>
                          skill.toLowerCase().includes(searchTerm.toLowerCase())
                        )
                        .map((skill) => (
                          <Box
                            key={skill}
                            sx={{
                              p: 1,
                              '&:hover': {
                                backgroundColor: 'action.hover',
                                cursor: 'pointer',
                              },
                            }}
                            onClick={() => handleAddSkill(skill)}
                          >
                            {skill}
                          </Box>
                        ))}
                    </Paper>
                  )}

                  <Box
                    sx={{ mt: 2, display: 'flex', flexWrap: 'wrap', gap: 1 }}
                  >
                    {editedProject.skills?.map((skill, index) => (
                      <Chip
                        key={index}
                        label={skill}
                        onDelete={() => handleRemoveSkill(skill)}
                        color='primary'
                      />
                    ))}
                  </Box>
                </Box>

                <TextField
                  fullWidth
                  label='Budget ($)'
                  name='budget'
                  value={editedProject.budget || ''}
                  onChange={handleInputChange}
                  type='number'
                  variant='outlined'
                />
              </Stack>
            </Box>
          </DialogContent>

          <DialogActions sx={{ p: 3 }}>
            <Button
              variant='outlined'
              color='error'
              startIcon={<DeleteIcon />}
              onClick={() => handleDeleteProject(editedProject._id)}
            >
              Delete Project
            </Button>
            <Box sx={{ flex: 1 }} />
            <Button
              variant='outlined'
              onClick={() => setModalOpen(false)}
              sx={{ mr: 1 }}
            >
              Cancel
            </Button>
            <Button
              variant='contained'
              color='primary'
              onClick={handleSaveChanges}
            >
              Save Changes
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </div>
  );
};

export default PostedProjects;
