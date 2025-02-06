import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Card, CardContent, Typography, Button, CircularProgress, Grid, Container, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";

const ProposalsList = () => {
  const navigate = useNavigate();
  const [proposals, setProposals] = useState({ accepted: [], pending: [], rejected: [] });
  const [loading, setLoading] = useState(true);
  const [deleteMessage, setDeleteMessage] = useState("");
  const [openDialog, setOpenDialog] = useState(false);

  const fetchProposals = async () => {
    try {
      const apiUrl = "http://localhost:3000/api/proposal/freelancer/proposals";
      const accessToken = localStorage.getItem("accessToken");
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      };

      const response = await axios.get(apiUrl, config);
  
      const categorizedProposals = {
        accepted: response.data.filter((proposal) => proposal.status === "accepted"),
        pending: response.data.filter((proposal) => proposal.status === "pending"),
        rejected: response.data.filter((proposal) => proposal.status === "rejected"),
      };

      setProposals(categorizedProposals);
    } catch (error) {
      console.error("Error fetching proposals:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProposals();
  }, []);

  const handleDelete = async (proposalId) => {
    try {
      const apiUrl = `http://localhost:3000/api/proposal/delete-proposal/${proposalId}`;
      const accessToken = localStorage.getItem("accessToken");
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      };

      await axios.delete(apiUrl, config);

      setProposals((prevProposals) => ({
        accepted: prevProposals.accepted,
        pending: prevProposals.pending.filter((proposal) => proposal._id !== proposalId),
        rejected: prevProposals.rejected.filter((proposal) => proposal._id !== proposalId),
      }));

      setDeleteMessage("Proposal deleted successfully.");
      setOpenDialog(true);
    } catch (error) {
      console.error("Error deleting proposal:", error);
      setDeleteMessage("Failed to delete proposal.");
      setOpenDialog(true);
    }
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleProposalClick = (proposal, status) => {
    if (status === "accepted") {
      navigate(`/milestone-manager/${proposal.projectId._id}`);
    }
  };

  if (loading) return <CircularProgress style={{ display: "block", margin: "auto" }} />;

  return (
    <Container>
      <Typography variant="h4" sx={{ mb: 3, textAlign: "center" }}>My Proposals</Typography>
      {Object.entries(proposals).map(([status, list]) => (
        <div key={status}>
          <Typography variant="h5" sx={{ mb: 2, mt: 3 }}>{status.charAt(0).toUpperCase() + status.slice(1)} Proposals</Typography>
          <Grid container spacing={2}>
            {list.length > 0 ? (
              list.map((proposal) => (
                <Grid item xs={12} sm={6} md={6} key={proposal._id}>
                  <Card
                    sx={{
                      p: 2,
                      boxShadow: 3,
                      transition: "transform 0.2s ease-in-out",
                      "&:hover": { 
                        transform: "scale(1.05)", 
                        boxShadow: 6,
                        cursor: status === "accepted" ? "pointer" : "default" 
                      },
                    }}
                    onClick={() => handleProposalClick(proposal, status)}
                  >
                    <CardContent>
                      <Typography variant="h6" color="primary">
                        {proposal.projectId.title}
                      </Typography>
                      <Typography variant="body2" color="textSecondary" align="justify">
                        {proposal.description}
                      </Typography>
                      <Typography variant="body2"><strong>Budget:</strong> $ {proposal.budget}</Typography>
                      <Typography variant="body2"><strong>Duration:</strong> {proposal.duration}</Typography>
                      {status !== "accepted" && (
                        <Button
                          variant="contained"
                          color="error"
                          size="small"
                          sx={{ mt: 2 }}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDelete(proposal._id);
                          }}
                        >
                          Delete
                        </Button>
                      )}
                    </CardContent>
                  </Card>
                </Grid>
              ))
            ) : (
              <Typography>No {status} proposals found.</Typography>
            )}
          </Grid>
        </div>
      ))}

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>{deleteMessage === "Proposal deleted successfully." ? "Success" : "Error"}</DialogTitle>
        <DialogContent>
          <Typography>{deleteMessage}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">Close</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default ProposalsList;