import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, Box, IconButton } from '@mui/material';
import { Link } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';
import FacebookRoundedIcon from '@mui/icons-material/FacebookRounded';
import warning from '../../../../assets/imges/Security-amico.png';



interface AuthModalProps {
  open: boolean;
  onClose: () => void;
}

export default function AuthModal({ open, onClose }: AuthModalProps) {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        <Box display="flex" justifyContent="end">
          <IconButton
            aria-label="close"
            onClick={onClose}
            color="error"
            sx={{
              border: "3px solid",
              borderColor: "error.main",
              width: 30,
              height: 30,
            }}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </Box>
      </DialogTitle>

      <DialogContent sx={{ p: 2 }}>
        <Box
          component="img"
          src={warning}
          alt="warning"
          sx={{ width: 200, height: 200, m: 'auto', display: 'block' }}
        />
        <Typography variant='h5' textAlign="center" mt={2}>
          Please login
        </Typography>
      </DialogContent>

      <DialogActions sx={{ display: 'flex', flexDirection: 'column', p: 3, gap: 2 }}>
        {/* Login */}
        <Button
          variant="contained"
          color="primary"
          component={Link}
          to="/auth/login"
          onClick={onClose}
          fullWidth
        >
          Login
        </Button>

        <Typography >or</Typography>

<Button
  variant="outlined"
  fullWidth
  startIcon={
    <Box
      component="img"
      src="https://developers.google.com/identity/images/g-logo.png"
      alt="Google Logo"
      sx={{ width: 20, height: 20 }}
    />
  }
  sx={{
    textTransform: 'none',
    fontWeight: 'bold',
    color: 'gray',
    borderColor: 'grey.400',
    backgroundColor: 'white',
    '&:hover': {
      backgroundColor: 'grey.100',
    },
  }}
>
  Continue with Google
</Button>

        
        {/* Facebook */}
        <Button
          variant="contained"
          fullWidth
          startIcon={<FacebookRoundedIcon />}
          sx={{
            textTransform: 'none',
            fontWeight: 'bold',
            color: 'white', 
            borderColor: 'grey.400',
          }}
        >
          Continue with Facebook
        </Button>

        <Box sx={{display:"flex",alignItems:"center"}}>

        <Typography>Don't have an account?</Typography>
        {/* Register */}
        <Button
          variant="text"
          color="primary"
          component={Link}
          to="/auth/register"
          onClick={onClose}
          sx={{ fontWeight: 'bold', textTransform: 'none' }}
        >
          Register
        </Button>
        </Box>
      </DialogActions>
    </Dialog>
  )
}