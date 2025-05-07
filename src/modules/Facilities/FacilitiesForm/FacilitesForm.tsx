import React from 'react'
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
  useTheme,
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'

interface FacilityFormProps {
  open: boolean
  onClose: () => void
  onSubmit: () => void
  facilityName: string
  setFacilityName: (value: string) => void
  isEditing: boolean
}

const FacilityForm: React.FC<FacilityFormProps> = ({
  open,
  onClose,
  onSubmit,
  facilityName,
  setFacilityName,
  isEditing,
}) => {
  const theme = useTheme()
  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
      BackdropProps={{ invisible: true }}
      PaperProps={{
        sx: {
          borderRadius: '20px',
        },
      }}
    >
      <DialogTitle sx={{ m: 0, p: 4, color: theme.palette.text.primary }}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6">
            {isEditing ? 'Edit Facility' : 'Add Facility'}
          </Typography>
          <IconButton
            onClick={onClose}
            sx={{
              border: `3px solid ${theme.palette.error.main}`,
              width: 30,
              height: 30,
              transition: 'all 0.3s linear',
              '&:hover': {
                backgroundColor: 'transparent',
                color: theme.palette.error.dark,
                borderColor: theme.palette.error.dark,
              },
            }}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </Box>
      </DialogTitle>

      <DialogContent
        dividers
        sx={{
          marginTop: '50px',
          marginBottom: '50px',
          padding: '50px',
          border: 'none',
        }}
      >
        <TextField
          autoFocus
          margin="dense"
          label="Facility Name"
          fullWidth
          value={facilityName}
          onChange={(e) => setFacilityName(e.target.value)}
          sx={{
            '& .MuiOutlinedInput-root': {
              backgroundColor:
                theme.palette.mode === 'light' ? '#f5f5f5' : '#252525',
              '& fieldset': {
                borderColor: 'transparent',
              },
              '&:hover fieldset': {
                borderColor: theme.palette.primary.main,
              },
              '&.Mui-focused fieldset': {
                borderColor: theme.palette.primary.main,
              },
            },
            '& .MuiInputLabel-root': {
              color: theme.palette.mode === 'light' ? '#152C5B' : '#1976d2',
            },
            '& .MuiOutlinedInput-input': {
              color: theme.palette.text.primary,
            },
          }}
        />
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button
          onClick={onSubmit}
          variant="contained"
          sx={{
            backgroundColor:
              theme.palette.mode === 'light' ? '#203FC7' : '#1976d2',
            px: 4,
            py: 1,
            borderRadius: '10px',
            '&:hover': {
              backgroundColor:
                theme.palette.mode === 'light' ? '#1834A8' : '#1565c0',
            },
          }}
        >
          {isEditing ? 'Update' : 'Save'}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default FacilityForm
