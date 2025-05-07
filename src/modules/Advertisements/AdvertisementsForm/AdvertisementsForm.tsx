import React from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  IconButton,
  Typography,
  Box,
  TextField,
  Switch,
  FormControlLabel,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  useTheme,
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'

interface AdvertisementsFormProps {
  open: boolean
  onClose: () => void
  onSubmit: () => void
  rooms: Array<{
    _id: string
    roomNumber: string
    price: number
    capacity: number
    discount: number
  }>
  selectedRoomId: string
  setSelectedRoomId: (value: string) => void
  discount: number
  setDiscount: (value: number) => void
  isActive: boolean
  setIsActive: (value: boolean) => void
  isEditing: boolean
}

const AdvertisementsForm: React.FC<AdvertisementsFormProps> = ({
  open,
  onClose,
  onSubmit,
  rooms,
  selectedRoomId,
  setSelectedRoomId,
  discount,
  setDiscount,
  isActive,
  setIsActive,
  isEditing,
}) => {
  const theme = useTheme()
  const inputStyles = {
    '& .MuiOutlinedInput-root': {
      backgroundColor: theme.palette.mode === 'light' ? '#f5f5f5' : '#252525',
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
    '& .MuiSelect-icon': {
      color: theme.palette.text.primary,
    },
    '& .MuiOutlinedInput-input': {
      color: theme.palette.text.primary,
    },
  }
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
            {isEditing ? 'Edit Advertisement' : 'Add Advertisement'}
          </Typography>
          <IconButton
            onClick={onClose}
            color="error"
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
        <FormControl fullWidth sx={{ mb: 3, ...inputStyles }}>
          <InputLabel id="room-select-label">Room</InputLabel>
          <Select
            labelId="room-select-label"
            id="room-select"
            value={selectedRoomId}
            label="Room"
            onChange={(e) => setSelectedRoomId(e.target.value)}
          >
            {rooms.map((room) => (
              <MenuItem
                key={room._id}
                value={room._id}
                sx={{
                  color: theme.palette.text.primary,
                  '&:hover': {
                    backgroundColor:
                      theme.palette.mode === 'light'
                        ? 'rgba(0, 0, 0, 0.04)'
                        : 'rgba(255, 255, 255, 0.08)',
                  },
                }}
              >
                {room.roomNumber} (EGP {room.price}, {room.capacity} persons)
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          margin="dense"
          label="Discount (%)"
          type="number"
          fullWidth
          value={discount}
          onChange={(e) => setDiscount(Number(e.target.value))}
          sx={{ mb: 3, ...inputStyles }}
          inputProps={{
            min: 0,
            max: 100,
          }}
        />

        <FormControlLabel
          control={
            <Switch
              checked={isActive}
              onChange={(e) => setIsActive(e.target.checked)}
              color="primary"
            />
          }
          label="Active"
          sx={{
            color: theme.palette.text.primary,
          }}
        />
      </DialogContent>

      <DialogActions
        sx={{
          px: 3,
          pb: 2,
        }}
      >
        <Button
          onClick={onSubmit}
          variant="contained"
          sx={{
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

export default AdvertisementsForm
