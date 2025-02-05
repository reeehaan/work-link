import { useState } from "react";
import { TextField, Button, Card, CardContent, Typography } from "@mui/material";
import axios from "axios";
import { useParams } from "react-router-dom";

const ProposalForm = ({ onClose }) => {
  const { projectId } = useParams();
  const [proposal, setProposal] = useState({ description: "", budget: "", duration: "" });
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => setProposal({ ...proposal, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");

    try {
      const apiUrl = `http://localhost:3000/api/proposal`;
      const accessToken = localStorage.getItem("accessToken");

      await axios.post(apiUrl, { projectId, ...proposal }, {
        headers: { 
          "Content-Type": "application/json", 
          Authorization: `Bearer ${accessToken}` },
      });

      setProposal({ 
        description: "", 
        budget: "", 
        duration: "" 
      });
      setSuccessMessage("Proposal sent successfully!");
      setTimeout(() => onClose(), 2000); // Close after success
    } catch (error) {
      setError("Failed to send proposal. Please try again.");
    }
  };

  return (
    <Card sx={{ padding: 2 }}>
      <CardContent>
        <Typography variant="h5" gutterBottom>Send Proposal</Typography>
        {error && <Typography color="error">{error}</Typography>}
        {successMessage && <Typography color="success.main">{successMessage}</Typography>}
        <form onSubmit={handleSubmit}>
          <TextField multiline rows={4}  label="Description" name="description" fullWidth sx={{ mt: 4 }} value={proposal.description} onChange={handleChange} required />
          <TextField label="Budget (LKR)" name="budget" type="number" fullWidth sx={{ mt: 4 }} value={proposal.budget} onChange={handleChange} required />
          <TextField label="Duration (days)" name="duration" fullWidth sx={{ mt: 4 }} value={proposal.duration} onChange={handleChange} required />
          <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>Submit</Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default ProposalForm;
