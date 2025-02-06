import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { 
    Card, CardContent, Typography, Button, Grid, Box, 
    Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle 
} from "@mui/material";

const ViewProposal = () => {
    const navigate = useNavigate();
    const { projectId } = useParams();
    const [proposals, setProposals] = useState([]);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [dialogMessage, setDialogMessage] = useState("");

    useEffect(() => {
        const getProjectRelatedProposals = async () => {
            try {
                const apiUrl = `http://localhost:3000/api/proposal/${projectId}`;
                const accessToken = localStorage.getItem('accessToken');
                const config = {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${accessToken}`,
                    },
                };
                const response = await axios.get(apiUrl, config);
                setProposals(response.data); 
            } catch (error) {
                console.error("Error fetching proposals:", error);
            }
        };

        getProjectRelatedProposals();
    }, [projectId]);

    const onAccept = async (proposalId) => {
        try {
            const apiUrl = `http://localhost:3000/api/proposal/accept/${proposalId}`;
            const accessToken = localStorage.getItem('accessToken'); 
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessToken}`,
                },
            };

            const response = await axios.patch(apiUrl, {}, config);
            console.log(response);
            
            setDialogMessage("Proposal has been accepted successfully!");
            setDialogOpen(true);

            setProposals((prevProposals) =>
                prevProposals.map((proposal) =>
                    proposal._id === proposalId ? { ...proposal, status: "accepted" } : proposal
                )
            );

        } catch (error) {
            console.error('Error accepting proposal:', error);
            setDialogMessage("Failed to accept the proposal. Please try again.");
            setDialogOpen(true);
        }
    };

    const onReject = async (proposalId) => {
        try {
            const apiUrl = `http://localhost:3000/api/proposal/reject/${proposalId}`;
            const accessToken = localStorage.getItem('accessToken'); 
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessToken}`,
                },
            };

            const response = await axios.patch(apiUrl, {}, config);
            console.log(response);
            
            setDialogMessage("Proposal has been rejected successfully!");
            setDialogOpen(true);

            setProposals((prevProposals) =>
                prevProposals.map((proposal) =>
                    proposal._id === proposalId ? { ...proposal, status: "rejected" } : proposal
                )
            );

        } catch (error) {
            console.error('Error rejecting proposal:', error);
            setDialogMessage("Failed to reject the proposal. Please try again.");
            setDialogOpen(true);
        }
    };

    const handleProposalClick = (proposal) => {
        if (proposal.status === "accepted") {
            navigate(`/milestone-manager-client/${proposal.projectId._id}`);
        }
    };

    return (
        <Box p={3}>
            <Typography variant="h5" gutterBottom>
                Proposals for Your Project
            </Typography>
            <Grid container spacing={3}>
                {proposals.map((proposal) => (
                    <Grid item xs={12} sm={6} md={4} key={proposal._id}>
                        <Card 
                            variant="outlined" 
                            onClick={() => handleProposalClick(proposal)} 
                            style={{ cursor: proposal.status === "accepted" ? "pointer" : "default" }}
                        >
                            <CardContent>
                                <Typography variant="h6">
                                    You received a proposal from {proposal.freelancerId.userId.firstName} {proposal.freelancerId.userId.lastName}
                                </Typography>
                                <Typography variant="body1" color="textSecondary" align='justify'>
                                    {proposal.description}
                                </Typography>
                                <Typography variant="body2" color="textSecondary">
                                    <strong>Budget:</strong> $ {proposal.budget}
                                </Typography>
                                <Typography variant="body2" color="textSecondary">
                                    <strong>Duration:</strong> {proposal.duration}
                                </Typography>
                                <Box mt={2} display="flex" justifyContent="space-between">
                                    <Button 
                                        variant="contained" 
                                        color="primary" 
                                        onClick={(e) => {
                                            e.stopPropagation(); // Prevent triggering the card click
                                            onAccept(proposal._id);
                                        }}
                                        disabled={proposal.status === "accepted"}
                                    >
                                        {proposal.status === "accepted" ? "Accepted" : "Accept"}
                                    </Button>
                                    <Button 
                                        variant="contained" 
                                        color="secondary"
                                        onClick={(e) => {
                                            e.stopPropagation(); // Prevent triggering the card click
                                            onReject(proposal._id);
                                        }}
                                        disabled={proposal.status === "rejected"}
                                    >
                                        {proposal.status === "rejected" ? "Rejected" : "Reject"}
                                    </Button>
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
                <DialogTitle>Proposal Update</DialogTitle>
                <DialogContent>
                    <DialogContentText>{dialogMessage}</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setDialogOpen(false)} color="primary">
                        OK
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default ViewProposal;
