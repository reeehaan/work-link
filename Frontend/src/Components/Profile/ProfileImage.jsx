import  { useState } from 'react';
import { 
  Modal, 
  Box, 
  TextField, 
  Button, 
  IconButton,
  Typography,
  Avatar
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import CameraAltIcon from '@mui/icons-material/CameraAlt';

const ProfileImage = ({ editMode, image, firstName, lastName, onImageUpdate }) => {
  const [open, setOpen] = useState(false);
  const [imageUrl, setImageUrl] = useState(image || '');

  const handleOpen = () => {
    if (editMode) {
      setOpen(true);
    }
  };

  const handleClose = () => setOpen(false);

  const handleSave = () => {
    onImageUpdate(imageUrl);
    handleClose();
  };

  const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius: 2,
  };

  return (
    <>
      <Box 
        position="relative" 
        sx={{ 
          cursor: editMode ? 'pointer' : 'default',
          '&:hover .overlay': {
            opacity: editMode ? 1 : 0,
          }
        }}
        onClick={handleOpen}
      >
        <Avatar
          src={image}
          alt={`${firstName} ${lastName}`}
          sx={{
            width: 150,
            height: 150,
            fontSize: '2rem',
            backgroundColor: 'grey.300',
          }}
        >
          {!image && (firstName?.[0] || '') + (lastName?.[0] || '')}
        </Avatar>

        {editMode && (
          <Box
            className="overlay"
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              borderRadius: '50%',
              opacity: 0,
              transition: 'opacity 0.3s',
            }}
          >
            <CameraAltIcon sx={{ color: 'white' }} />
          </Box>
        )}
      </Box>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box sx={modalStyle}>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
            <Typography id="modal-title" variant="h6" component="h2">
              Update Profile Image
            </Typography>
            <IconButton onClick={handleClose} size="small">
              <CloseIcon />
            </IconButton>
          </Box>

          <TextField
            fullWidth
            label="Image URL"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            placeholder="Enter image URL"
            margin="normal"
          />

          {imageUrl && (
            <Box mt={2} display="flex" flexDirection="column" alignItems="center">
              <Typography variant="subtitle2" gutterBottom>
                Preview:
              </Typography>
              <Avatar
                src={imageUrl}
                alt="Preview"
                sx={{
                  width: 100,
                  height: 100,
                  mb: 2
                }}
              />
            </Box>
          )}

          <Box display="flex" justifyContent="flex-end" gap={1} mt={3}>
            <Button onClick={handleClose} color="inherit">
              Cancel
            </Button>
            <Button onClick={handleSave} variant="contained">
              Save
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default ProfileImage;