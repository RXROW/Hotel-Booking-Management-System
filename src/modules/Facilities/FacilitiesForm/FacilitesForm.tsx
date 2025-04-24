import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  IconButton,
  Typography,
  Box,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

interface FacilityFormProps {
  open: boolean;
  onClose: () => void;
  onSubmit: () => void;
  facilityName: string;
  setFacilityName: (value: string) => void;
  isEditing: boolean;
}

const FacilityForm: React.FC<FacilityFormProps> = ({
  open,
  onClose,
  onSubmit,
  facilityName,
  setFacilityName,
  isEditing,
}) => {
  return (
    <Dialog
      open={open} onClose={onClose}
      fullWidth maxWidth="sm" BackdropProps={{ invisible: true }}
      PaperProps={{
      sx: { borderRadius: '20px' }, 
    }}
  >
      <DialogTitle sx={{ m: 0, p: 4  }}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6">
            {isEditing ? 'Edit Facility' : 'Add Facility'}
          </Typography>
          <IconButton
            onClick={onClose}
            color="error"
            sx={{
              border: "3px solid",
              width: 30,
              height: 30,
            }}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </Box>
      </DialogTitle>

      <DialogContent dividers sx={{marginTop:"50px",marginBottom:"50px",padding:"50px",border:"none"}}>
        <TextField
          autoFocus
          margin="dense"
          label="Facility Name"
          fullWidth
          value={facilityName}
          onChange={(e) => setFacilityName(e.target.value)}
        />
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button onClick={onSubmit} variant="contained"sx={{background:"#203FC7",px:4,py:1,borderRadius:"10px"}} >
          {isEditing ? 'Update' : 'Save'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default FacilityForm;
