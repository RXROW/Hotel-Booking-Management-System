import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, Box, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

interface ViewModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  data: Record<string, string>;
}

const ViewModal: React.FC<ViewModalProps> = ({ open, onClose, title, data }) => {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm" BackdropProps={{ invisible: true }}>
      <DialogTitle>
       
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6">
          {title}
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
      <DialogContent dividers sx={{ px: 4, py: 4 }}>
        {Object.entries(data).map(([label, value]) => (
          <Box key={label} mb={2}>
            <Typography variant="subtitle2" fontWeight="bold">
              {label}
            </Typography>
            <Typography variant="body1">{value || ''}</Typography>
          </Box>
        ))}
      </DialogContent>
      
    </Dialog>
  );
};

export default ViewModal;
