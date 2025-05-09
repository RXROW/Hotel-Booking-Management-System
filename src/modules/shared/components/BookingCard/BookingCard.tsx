import {
  Box,
  Button,
  CircularProgress,
  IconButton,
  Modal,
  Popover,
  TextField,
  Typography,
} from '@mui/material'
import { styled, useTheme } from '@mui/system'
import { Link, useNavigate } from 'react-router-dom'
import { useContext, useState } from 'react'
import HighlightOffIcon from '@mui/icons-material/HighlightOff'
import { red } from '@mui/material/colors'
import axios from 'axios'
import { AuthContext } from '../../../../context/AuthContext.js'
import { privateInstance } from '../../../../services/apis/apisConfig.js'
import { BOOKING_URL_USER } from '../../../../services/apis/apisUrls.js'
import { DatePicker } from '@mui/x-date-pickers'
import dayjs, { Dayjs } from 'dayjs'
import Calendar from '../../../../assets/imges/ic_calendar.png'
import { Add, Remove } from '@mui/icons-material'
import { toast } from 'react-toastify'
import AuthModal from '../AuthModal/AuthModal.js'

const CustomizedBox = styled(Box)(({}) => ({
  display: 'flex',
  flexDirection: 'column',
  color: 'rgb(176, 176, 176)',
  width: '100%',
  padding: '2rem',
  borderRadius: '8px',
  border: '2px solid rgb(226, 229, 235)',
  textAlign: 'start',
}))

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: 'none',
  borderRadius: '1rem',
  boxShadow: 24,
  p: 4,
}

export default function BookingCard({
  roomId,
  totalPrice,
  discount,
  capacity,
}: {
  roomId: string
  totalPrice: number
  discount: number
  capacity: number
}) {
  let navigate = useNavigate()
  const { loginData } = useContext(AuthContext)
  const theme = useTheme()
  const [startDate, setStartDate] = useState<Dayjs | null>(null)
  const [endDate, setEndDate] = useState<Dayjs | null>(null)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [error, setError] = useState<string>('')
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
  const [open, setOpen] = useState(false)
  const [currentCapacity, setCurrentCapacity] = useState<number>(1)

  const handleIncrease = () => {
    setCurrentCapacity((prev) => prev + 1)
  }

  const handleDecrease = () => {
    setCurrentCapacity((prev) => (prev > 1 ? prev - 1 : 1))
  }

  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleModalOpen = () => setOpen(true)
  const handleModalClose = () => setOpen(false)

  const handleButtonClick = async () => {
    try {
      if (!startDate || !endDate) {
        setError('Please pick a start and end date.')
        toast.error('Please pick a start and end date.')
        return
      }
      setIsSubmitting(true)
      if (loginData?.role === 'user') {
        const response = await privateInstance.post(
          BOOKING_URL_USER.CREATE_BOOKING,
          {
            room: roomId,
            startDate,
            endDate,
            totalPrice,
          },
        )
        if (response.status === 201) {
          navigate(`/payment`, {
            state: { bookingId: response?.data?.data?.booking._id },
          })
          toast.success('Booking successful!')
        }
      } else {
        handleModalOpen()
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error(error)
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  const isPopoverOpen = Boolean(anchorEl)

  const numberOfDays =
    startDate && endDate ? endDate.diff(startDate, 'day') || 1 : 0

  return (
    <>
      <CustomizedBox>
        <Typography>Start Booking</Typography>
        <Typography variant="h4" component="p">
          <Box component="span" sx={{ color: '#1ABC9C' }}>
            ${totalPrice}
          </Box>{' '}
          per night
        </Typography>
        <Typography sx={{ marginBlockEnd: '7.875rem', color: '#FF1612' }}>
          Discount {discount}% off
        </Typography>
        <Typography variant="h6" sx={{ marginBlockEnd: '0.5rem' }}>
          Pick a Date
        </Typography>

        <Box display="flex" alignItems="center" mb={2} gap={1}>
          <Box
            component="img"
            src={Calendar}
            alt="calendar"
            onClick={handleOpen}
            sx={{
              width: 70,
              height: 46,
              cursor: 'pointer',
            }}
          />

          <TextField
            value={
              startDate && endDate
                ? `${startDate.format('DD MMM')} - ${endDate.format('DD MMM')}`
                : 'Pick your dates'
            }
            size="small"
            fullWidth
            variant="standard"
            InputProps={{
              readOnly: true,
              disableUnderline: true,
              required: true,
              sx: {
                textAlign: 'center',
                height: 46,
                fontWeight: 'bold',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: 0,
                backgroundColor: theme.palette.background.paper,
                color: theme.palette.text.primary,
                borderRadius: 1,
                boxShadow:
                  theme.palette.mode === 'light'
                    ? '0px 2px 8px rgba(50, 82, 223, 0.07), 0px 4px 12px rgba(50, 82, 223, 0.05)'
                    : '0px 2px 8px rgba(0, 0, 0, 0.15), 0px 4px 12px rgba(0, 0, 0, 0.1)',
                transition: 'all 0.3s ease',
                '&:hover': {
                  boxShadow:
                    theme.palette.mode === 'light'
                      ? '0px 4px 12px rgba(50, 82, 223, 0.1), 0px 6px 16px rgba(50, 82, 223, 0.08)'
                      : '0px 4px 12px rgba(0, 0, 0, 0.2), 0px 6px 16px rgba(0, 0, 0, 0.14)',
                },
              },
            }}
            inputProps={{
              style: { textAlign: 'center' },
            }}
          />

          <Popover
            open={isPopoverOpen}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
          >
            <Box display="flex" gap={2} p={2}>
              <DatePicker
                label="Start Date"
                value={startDate}
                onChange={(newValue) => setStartDate(newValue)}
              />
              <DatePicker
                label="End Date"
                value={endDate}
                minDate={startDate}
                onChange={(newValue) => setEndDate(newValue)}
              />
            </Box>
          </Popover>
        </Box>

        <Typography
          variant="h6"
          sx={{
            marginBlock: '1rem',
            fontWeight: 'bold',
          }}
        >
          Capacity
        </Typography>

        <Box display="flex" alignItems="center" mb={2} gap={1}>
          <IconButton
            onClick={handleDecrease}
            sx={{
              bgcolor: '#E74C3C',
              color: 'white',
              width: 46,
              height: 46,
              borderRadius: 1,
              '&:hover': { bgcolor: '#c0392b' },
            }}
          >
            <Remove />
          </IconButton>

          <TextField
            value={`${currentCapacity} Person`}
            size="small"
            fullWidth
            variant="standard"
            InputProps={{
              readOnly: true,
              disableUnderline: true,
              sx: {
                textAlign: 'center',
                height: 46,
                fontWeight: 'bold',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: 0,
                backgroundColor: theme.palette.background.paper,
                color: theme.palette.text.primary,
                borderRadius: 1,
              },
            }}
            inputProps={{
              style: { textAlign: 'center' },
            }}
          />
          <IconButton
            onClick={handleIncrease}
            sx={{
              bgcolor: '#2ECC71',
              color: 'white',
              width: 46,
              height: 46,
              borderRadius: 1,
              '&:hover': { bgcolor: '#27ae60' },
            }}
          >
            <Add />
          </IconButton>
        </Box>

        <Typography>
          You will pay
          <Box sx={{ fontWeight: 'bold', color: '#152C5B' }} component="span">
            ${totalPrice * currentCapacity * numberOfDays} USD
          </Box>
          for
          <Box sx={{ fontWeight: 'bold', color: '#152C5B' }} component="span">
            {currentCapacity} {currentCapacity === 1 ? 'Person' : 'People'}
          </Box>
          for
          <Box sx={{ fontWeight: 'bold', color: '#152C5B' }} component="span">
            {numberOfDays} {numberOfDays === 1 ? 'Day' : 'Days'}
          </Box>
        </Typography>

        <Button
          onClick={handleButtonClick}
          sx={{
            marginBlock: '1rem',
            marginInline: 'auto',
            backgroundColor: '#3252DF',
            width: { xs: '95%', md: '70%' },
            height: '3rem',
            borderRadius: '0.25rem',
            textTransform: 'none',
            color: '#fff',
            fontSize: '17px',
            '&.Mui-disabled': {
              background: '#949fcf',
              color: '#c0c0c0',
            },
          }}
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <CircularProgress sx={{ color: 'white' }} size={'1rem'} />
          ) : (
            'Continue Book'
          )}
        </Button>
      </CustomizedBox>
      <AuthModal open={open} onClose={handleModalClose} />
    </>
  )
}
