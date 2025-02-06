import { useState, useEffect } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Paper,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Select,
  MenuItem,
  Typography,
  Box,
  IconButton,
  Snackbar,
  Alert
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import PaymentIcon from "@mui/icons-material/Payment";
import { useParams } from "react-router-dom";

const MilestoneManager = () => {
  const { projectId } = useParams();
  const [milestones, setMilestones] = useState([]);
  const [projectTitle, setProjectTitle] = useState('');
  const [open, setOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [currentMilestone, setCurrentMilestone] = useState({
    id: null,
    title: "",
    description: "",
    dueDate: "",
    amount: "",
    status: "Pending",
  });
  const [role, setRole] = useState("");

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  const showSuccessSnackbar = (message) => {
    setSnackbarMessage(message);
    setSnackbarSeverity("success");
    setSnackbarOpen(true);
  };

  const showErrorSnackbar = (message) => {
    setSnackbarMessage(message);
    setSnackbarSeverity("error");
    setSnackbarOpen(true);
  };

  const handleOpen = (milestone = null) => {
    setCurrentMilestone(
      milestone || {
        id: null,
        title: "",
        description: "",
        dueDate: "",
        amount: "",
        status: "Pending",
      }
    );
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const handleChange = (e) => {
    setCurrentMilestone({ ...currentMilestone, [e.target.name]: e.target.value });
  };

  
  const fetchProjectTitle = async () => {
      const response = await axios.get(`http://localhost:3000/api/project/${projectId}`);
      // Extract project title from the response
      const title = response.data.title
      setProjectTitle(title);
  };

  useEffect(() => {
    fetchProjectTitle();
  }, [projectId]);

  const handleSave = async () => {
    try {
      // Validate required fields
      if (!currentMilestone.title || !currentMilestone.description || 
          !currentMilestone.dueDate || !currentMilestone.amount) {
        showErrorSnackbar("Please fill in all required fields.");
        return;
      }

      if (currentMilestone._id) {
        // Update existing milestone logic
        const apiUrl = `http://localhost:3000/api/milestone/update-milestone/${projectId}/${currentMilestone._id}`;
        const accessToken = localStorage.getItem("accessToken");

        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        };

        const response = await axios.put(apiUrl, currentMilestone, config);
        
        if (response.status === 200) {
          // Update local state
          fetchMilestones();
          showSuccessSnackbar("Milestone updated successfully!");
        }
      } else {
        // Create new milestone
        await createMilestone();
      }
      handleClose();
    } catch (error) {
      console.error("Error saving milestone:", error);
      
      const errorMessage = error.response?.data?.message || 
        "Failed to save milestone. Please try again.";
      showErrorSnackbar(errorMessage);
    }
  };

  const createMilestone = async () => {
    try {
      const apiUrl = `http://localhost:3000/api/milestone/create-milestone/${projectId}`;
      const accessToken = localStorage.getItem("accessToken");

      if (!accessToken) {
        console.error("Access token not found!");
        showErrorSnackbar("Authentication failed. Please log in again.");
        return;
      }

      const decodedToken = jwtDecode(accessToken);
      setRole(decodedToken.role);

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      };

      const response = await axios.post(apiUrl, currentMilestone, config);
      
      
      console.log("Create Milestone Response:", response);

     
      if (response.status === 200 || response.status === 201) {
        await fetchMilestones();
        showSuccessSnackbar("Milestone created successfully!");
      } else {
        console.error("Failed to create milestone:", response.statusText);
        showErrorSnackbar("Failed to create milestone. Please try again.");
      }
    } catch (error) {
      console.error("Error creating milestone:", error);
      // Check if there's a specific error message from the backend
      const errorMessage = error.response?.data?.message || 
        "Failed to create milestone. Please try again.";
      showErrorSnackbar(errorMessage);
    }
  };

  const fetchMilestones = async () => {
    try {
      const apiUrl = `http://localhost:3000/api/milestone/get-milestones/${projectId}`;
      const accessToken = localStorage.getItem("accessToken");

      if (!accessToken) {
        console.error("Access token not found!");
        return;
      }

      const decodedToken = jwtDecode(accessToken);
      setRole(decodedToken.role);

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      };

      const response = await axios.get(apiUrl, config);
      if (response.status === 200) {
        setMilestones(response.data.data);
      } else {
        console.error("Failed to fetch milestones:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching milestones:", error);
    }
  };

  const handleRemove = async (id) => {
    try {
      const apiUrl = `http://localhost:3000/api/milestone/delete-milestone/${projectId}/${id}`;
      const accessToken = localStorage.getItem("accessToken");

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      };

      const response = await axios.delete(apiUrl, config);
      
      if (response.status === 200) {
        // Use the passed id to filter
        fetchMilestones();
        showSuccessSnackbar("Milestone deleted successfully!");
      }
    } catch (error) {
      console.error("Error deleting milestone:", error);
      
      // Show more detailed error message
      const errorMessage = error.response?.data?.message || 
        "Failed to delete milestone. Please try again.";
      showErrorSnackbar(errorMessage);
    }
  };

  const handlePay = async () => {
    
  };

  useEffect(() => {
    fetchMilestones();
  }, [projectId]);

  return (
    <Box sx={{ width: "100%", p: 4 }}>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert 
          onClose={handleSnackbarClose} 
          severity={snackbarSeverity} 
          sx={{ width: '100%' }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
      
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom>
        {projectTitle ? projectTitle : "Loading..."}
        </Typography>
        <Typography variant="h6" gutterBottom>
          Manage Your Project Milestones
        </Typography>
        <Button variant="contained" color="primary" onClick={() => handleOpen()} sx={{ mb: 2 }}>
          Add Milestone
        </Button>
      </Box>

      {milestones.length === 0 ? (
        <Typography variant="body1">No milestones available. Please add a milestone.</Typography>
      ) : (
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <TableContainer component={Paper} sx={{ width: "1200px" }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: 'bold' }}>Title</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Description</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Due Date</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Amount</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Status</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {milestones.map((milestone) => (
                  <TableRow key={milestone.id}>
                    <TableCell>{milestone.title}</TableCell>
                    <TableCell>{milestone.description}</TableCell>
                    <TableCell>{new Date(milestone.dueDate).toLocaleDateString()}</TableCell>
                    <TableCell>${milestone.amount}</TableCell>
                    <TableCell>{milestone.status}</TableCell>
                    <TableCell>
                      {role === "freelancer" && (
                        <>
                          <IconButton color="primary" onClick={() => handleOpen(milestone)}>
                            <EditIcon />
                          </IconButton>
                          <IconButton color="error" onClick={() => handleRemove(milestone._id)}>
                            <DeleteIcon />
                          </IconButton>
                        </>
                      )}
                      {role === "client" && milestone.status !== "Paid" && (
                        <IconButton color="success" onClick={() => handlePay(milestone.id)}>
                          <PaymentIcon />
                        </IconButton>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      )}

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{currentMilestone.id ? "Update Milestone" : "Add Milestone"}</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Title"
            name="title"
            fullWidth
            required
            value={currentMilestone.title}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            label="Description"
            name="description"
            fullWidth
            required
            value={currentMilestone.description}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            label="Due Date"
            name="dueDate"
            type="date"
            fullWidth
            required
            InputLabelProps={{ shrink: true }}
            value={currentMilestone.dueDate}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            label="Amount"
            name="amount"
            type="number"
            fullWidth
            required
            value={currentMilestone.amount}
            onChange={handleChange}
          />
          <Select
            fullWidth
            name="status"
            value={currentMilestone.status}
            onChange={handleChange}
            sx={{ mt: 2 }}
          >
            <MenuItem value="Pending">Pending</MenuItem>
            <MenuItem value="In Progress">In Progress</MenuItem>
            <MenuItem value="Completed">Completed</MenuItem>
            <MenuItem value="Approved">Approved</MenuItem>
            <MenuItem value="Cancelled">Cancelled</MenuItem>
          </Select>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default MilestoneManager;