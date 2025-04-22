import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    Button,
    IconButton,
    Box,
  } from "@mui/material";
  import CloseIcon from '@mui/icons-material/Close';
  import DeleteIMG from '../../../../assets/imges/DeleteIMG.png';
  
  interface DeleteConfirmationProps {
      open: boolean;
      onClose: () => void;
      onConfirm: () => void;
      title?: string;
      message?: string;
    }
    
  
  const DeleteConfirmation: React.FC<DeleteConfirmationProps> = ({
    open,
    onClose,
    onConfirm,
    title = "Delete Confirmation",
    message = "Are you sure you want to delete this item?",
  }) => {
    return (
      <Dialog
        open={open}
        onClose={onClose}
        aria-labelledby="delete-dialog-title"
        aria-describedby="delete-dialog-description"
        fullWidth
        maxWidth="xs" 
        PaperProps={{
          sx: {
            mx: 2,
            width: "100%",
            maxWidth: 500,
            borderRadius: 2
          },
        }}
      >
        <Box display="flex" justifyContent="flex-end" p={2}>
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
  
        <Box mb={2} sx={{ textAlign: "center" }}>
          <img
            src={DeleteIMG}
            alt="Warning Icon"
            style={{ width: 80, height: 80 }}
          />
        </Box>
  
        <DialogTitle id="delete-dialog-title" textAlign="center">
          {title}
        </DialogTitle>
  
        <DialogContent sx={{ textAlign: "center" }}>
          <DialogContentText id="delete-dialog-description">
            {message}
          </DialogContentText>
        </DialogContent>
  
        <DialogActions sx={{ justifyContent: "center", pb: 2 }}>
          <Button onClick={onConfirm} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    );
  };
  
  export default DeleteConfirmation;
  