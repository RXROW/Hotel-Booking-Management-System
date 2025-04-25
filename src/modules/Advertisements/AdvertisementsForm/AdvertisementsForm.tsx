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
  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
      BackdropProps={{ invisible: true }}
      PaperProps={{
        sx: { borderRadius: '20px' },
      }}
    >
      <DialogTitle sx={{ m: 0, p: 4 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6">
            {isEditing ? 'Edit Advertisement' : 'Add Advertisement'}
          </Typography>
          <IconButton
            onClick={onClose}
            color="error"
            sx={{
              border: '3px solid',
              width: 30,
              height: 30,
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
        <FormControl fullWidth sx={{ mb: 3 }}>
          <InputLabel id="room-select-label">Room</InputLabel>
          <Select
            labelId="room-select-label"
            id="room-select"
            value={selectedRoomId}
            label="Room"
            onChange={(e) => setSelectedRoomId(e.target.value)}
          >
            {rooms.map((room) => (
              <MenuItem key={room._id} value={room._id}>
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
          sx={{ mb: 3 }}
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
        />
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button
          onClick={onSubmit}
          variant="contained"
          sx={{ background: '#203FC7', px: 4, py: 1, borderRadius: '10px' }}
        >
          {isEditing ? 'Update' : 'Save'}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default AdvertisementsForm
