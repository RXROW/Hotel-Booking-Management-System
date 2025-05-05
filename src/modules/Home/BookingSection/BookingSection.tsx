// import * as React from 'react'
// import {
//   Box,
//   Button,
//   Typography,
//   IconButton,
//   TextField,
//   Popover,
// } from '@mui/material'
// import { Add, Remove, CalendarToday } from '@mui/icons-material'
// import { useState } from 'react'
// import img from '../../../assets/imges/picture.png'
// import Calender from '../../../assets/imges/ic_calendar.png'
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
// import { DatePicker } from '@mui/x-date-pickers/DatePicker'
// import { Dayjs } from 'dayjs'
// import { useForm } from 'react-hook-form'
// import { useNavigate } from 'react-router-dom'
// import { toast } from 'react-toastify'

// interface dateData {
//   startDate: Dayjs
//   endDate: Dayjs
// }

// export default function BookingSection(): JSX.Element {
//   const [capacity, setCapacity] = useState<number>(1)
//   const [startDate, setStartDate] = useState<Dayjs | null>(null)
//   const [endDate, setEndDate] = useState<Dayjs | null>(null)
//   const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)
//   const { register, handleSubmit } = useForm<dateData>()
//   const navigate = useNavigate()

//   const handleIncrease = (): void => setCapacity((prev) => prev + 1)
//   const handleDecrease = (): void =>
//     setCapacity((prev) => (prev > 1 ? prev - 1 : 1))

//   const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
//     setAnchorEl(event.currentTarget)
//   }

//   const handleClose = () => {
//     setAnchorEl(null)
//   }

//   const open = Boolean(anchorEl)

//   const onSubmit = () => {
//     console.log('Start Date:', startDate?.format('DD MMM YYYY'))
//     console.log('End Date:', endDate?.format('DD MMM YYYY'))
//     console.log('Capacity:', capacity)

//     if (startDate && endDate) {
//       navigate(
//         `/explore-all-rooms?startDate=${startDate.format('YYYY-MM-DD')}&endDate=${endDate.format('YYYY-MM-DD')}&capacity=${capacity}`,
//       )
//     } else {
//       console.log('One of the dates is undefined or null')
//       toast.error('Please Pick up a date')
//     }
//   }

//   return (
//     <LocalizationProvider dateAdapter={AdapterDayjs}>
//       <Box
//         display="flex"
//         flexDirection={{ xs: 'column', lg: 'row' }}
//         alignItems="center"
//         justifyContent="center"
//         minHeight="100vh"
//         p={4}
//       >
//         {/* Left Section */}
//         <Box
//           flex={1}
//           pr={{ xs: 0, lg: 4 }}
//           mb={{ xs: 4, lg: 0 }}
//           textAlign={{ xs: 'center', lg: 'left' }}
//         >
//           <Typography variant="h4" fontWeight="bold" gutterBottom>
//             Forget Busy Work,
//             <br />
//             Start Next Vacation
//           </Typography>
//           <Typography variant="body2" color="text.secondary" mb={4}>
//             We provide what you need to enjoy your holiday with family.
//             <br />
//             Time to make another memorable moments.
//           </Typography>

//           {/* Booking Section */}
//           <Typography variant="subtitle1" fontWeight="bold" mb={1}>
//             Start Booking
//           </Typography>

//           {/* Pick a Date */}
//           <Box display="flex" alignItems="center" mb={2} gap={1}>
//             <Box
//               component="img"
//               src={Calender}
//               alt="calendar"
//               onClick={handleOpen}
//               sx={{
//                 width: 70,
//                 height: 46,
//                 cursor: 'pointer',
//               }}
//             />

//             <TextField
//               value={
//                 startDate && endDate
//                   ? `${startDate.format('DD MMM')} - ${endDate.format('DD MMM')}`
//                   : 'Pick your dates'
//               }
//               size="small"
//               fullWidth
//               variant="standard"
//               // onClick={handleOpen}
//               InputProps={{
//                 readOnly: true,
//                 disableUnderline: true,
//                 required: true,
//                 sx: {
//                   textAlign: 'center',
//                   height: 46,
//                   fontWeight: 'bold',
//                   display: 'flex',
//                   alignItems: 'center',
//                   justifyContent: 'center',
//                   padding: 0,
//                   backgroundColor: '#f9f9f9',
//                   borderRadius: 1,
//                 },
//               }}
//               inputProps={{
//                 style: { textAlign: 'center' },
//               }}
//             />

//             {/* Date Pickers inside Popover */}
//             <Popover
//               open={open}
//               anchorEl={anchorEl}
//               onClose={handleClose}
//               anchorOrigin={{
//                 vertical: 'bottom',
//                 horizontal: 'left',
//               }}
//             >
//               <Box display="flex" gap={2} p={2}>
//                 <DatePicker
//                   label="Start Date"
//                   value={startDate}
//                   onChange={(newValue) => setStartDate(newValue)}
//                 />
//                 <DatePicker
//                   label="End Date"
//                   value={endDate}
//                   minDate={startDate}
//                   onChange={(newValue) => setEndDate(newValue)}
//                 />
//               </Box>
//             </Popover>
//           </Box>

//           {/* Capacity */}
//           <Typography variant="subtitle1" fontWeight="bold" mb={1}>
//             Capacity
//           </Typography>

//           <Box
//             display="flex"
//             alignItems="center"
//             mb={4}
//             justifyContent="start"
//             gap={0}
//           >
//             <IconButton
//               onClick={handleDecrease}
//               sx={{
//                 bgcolor: '#E74C3C',
//                 color: 'white',
//                 width: 70,
//                 height: 46,
//                 borderRadius: 1,
//                 '&:hover': { bgcolor: '#c0392b' },
//               }}
//             >
//               <Remove />
//             </IconButton>

//             <TextField
//               value={`${capacity} Person`}
//               size="small"
//               fullWidth
//               variant="standard"
//               InputProps={{
//                 readOnly: true,
//                 disableUnderline: true,
//                 sx: {
//                   textAlign: 'center',
//                   height: 46,
//                   fontWeight: 'bold',
//                   display: 'flex',
//                   alignItems: 'center',
//                   justifyContent: 'center',
//                   padding: 0,
//                   backgroundColor: '#f9f9f9',
//                   borderRadius: 1,
//                 },
//               }}
//               inputProps={{
//                 style: { textAlign: 'center' },
//               }}
//             />

//             <IconButton
//               onClick={handleIncrease}
//               sx={{
//                 bgcolor: '#1ABC9C',
//                 color: 'white',
//                 width: 70,
//                 height: 46,
//                 borderRadius: 1,
//                 '&:hover': { bgcolor: '#16a085' },
//               }}
//             >
//               <Add />
//             </IconButton>
//           </Box>

//           {/* Explore Button */}
//           <Button
//             variant="contained"
//             sx={{
//               ml: 2,
//               paddingX: 10,
//               paddingY: '10px',
//               backgroundColor: '#3252DF',
//               '&:hover': { backgroundColor: '#2233aa' },
//             }}
//             onClick={handleSubmit(onSubmit)}
//           >
//             Explore
//           </Button>
//         </Box>

//         {/* Right Section (Image) */}
//         <Box
//           flex={1}
//           position="relative"
//           display="flex"
//           justifyContent="center"
//           alignItems="center"
//         >
//           {/* Background Frame */}
//           <Box
//             position="absolute"
//             width="80%"
//             height="80%"
//             bgcolor="#ffffff"
//             borderRadius="20px"
//             border="2px solid #E5E5E5"
//             top="25%"
//             left="25%"
//             zIndex={0}
//           />
//           <Box
//             sx={{
//               marginLeft: { lg: '100px', md: '100px', xs: '0' },
//               marginTop: '70px',
//               width: { lg: '470px', md: '400px', sm: '400px', xs: '100%' },
//               zIndex: 1,
//               display: { xs: 'none', sm: 'block' },
//             }}
//           >
//             <img style={{ width: '100%', height: '450px' }} src={img} alt="" />
//           </Box>
//         </Box>
//       </Box>
//     </LocalizationProvider>
//   )
// }

/**//////////////////////////////////////// */

import * as React from 'react'
import {
  Box,
  Button,
  Typography,
  IconButton,
  TextField,
  Popover,
} from '@mui/material'
import { Add, Remove } from '@mui/icons-material'
import { useState } from 'react'
import img from '../../../assets/imges/picture.png'
import Calender from '../../../assets/imges/ic_calendar.png'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { Dayjs } from 'dayjs'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useTheme } from '@mui/material/styles'

interface dateData {
  startDate: Dayjs
  endDate: Dayjs
}

export default function BookingSection(): JSX.Element {
  const [capacity, setCapacity] = useState<number>(1)
  const [startDate, setStartDate] = useState<Dayjs | null>(null)
  const [endDate, setEndDate] = useState<Dayjs | null>(null)
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)
  const { register, handleSubmit } = useForm<dateData>()
  const navigate = useNavigate()
  const theme = useTheme()

  const handleIncrease = (): void => setCapacity((prev) => prev + 1)
  const handleDecrease = (): void =>
    setCapacity((prev) => (prev > 1 ? prev - 1 : 1))

  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const open = Boolean(anchorEl)

  const onSubmit = () => {
    if (startDate && endDate) {
      navigate(
        `/explore-all-rooms?startDate=${startDate.format('YYYY-MM-DD')}&endDate=${endDate.format('YYYY-MM-DD')}&capacity=${capacity}`
      )
    } else {
      toast.error('Please Pick up a date')
    }
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box
        display="flex"
        flexDirection={{ xs: 'column', lg: 'row' }}
        alignItems="center"
        justifyContent="center"
        minHeight="100vh"
        p={4}
      >
        {/* Left Section */}
        <Box
          flex={1}
          pr={{ xs: 0, lg: 4 }}
          mb={{ xs: 4, lg: 0 }}
          textAlign={{ xs: 'center', lg: 'left' }}
        >
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            Forget Busy Work,
            <br />
            Start Next Vacation
          </Typography>
          <Typography variant="body2" color="text.secondary" mb={4}>
            We provide what you need to enjoy your holiday with family.
            <br />
            Time to make another memorable moments.
          </Typography>

          <Typography variant="subtitle1" fontWeight="bold" mb={1}>
            Start Booking
          </Typography>

          <Box display="flex" alignItems="center" mb={2} gap={1}>
            <Box
              component="img"
              src={Calender}
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
                },
              }}
              inputProps={{
                style: { textAlign: 'center' },
              }}
            />

            <Popover
              open={open}
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

          <Typography variant="subtitle1" fontWeight="bold" mb={1}>
            Capacity
          </Typography>

          <Box
            display="flex"
            alignItems="center"
            mb={4}
            justifyContent="start"
            gap={0}
          >
            <IconButton
              onClick={handleDecrease}
              sx={{
                bgcolor: '#E74C3C',
                color: 'white',
                width: 70,
                height: 46,
                borderRadius: 1,
                '&:hover': { bgcolor: '#c0392b' },
              }}
            >
              <Remove />
            </IconButton>

            <TextField
              value={`${capacity} Person`}
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
                bgcolor: '#1ABC9C',
                color: 'white',
                width: 70,
                height: 46,
                borderRadius: 1,
                '&:hover': { bgcolor: '#16a085' },
              }}
            >
              <Add />
            </IconButton>
          </Box>

          <Button
            variant="contained"
            sx={{
              ml: 2,
              paddingX: 10,
              paddingY: '10px',
              backgroundColor: '#3252DF',
              '&:hover': { backgroundColor: '#2233aa' },
            }}
            onClick={handleSubmit(onSubmit)}
          >
            Explore
          </Button>
        </Box>

        {/* Right Section */}
        {/* <Box
          flex={1}
          position="relative"
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Box
            position="absolute"
            width="80%"
            height="80%"
            bgcolor={theme.palette.background.paper}
            borderRadius="20px"
            border={`2px solid ${theme.palette.divider}`}
            top="25%"
            left="25%"
            zIndex={0}
          />
          <Box
            sx={{
              marginLeft: { lg: '100px', md: '100px', xs: '0' },
              marginTop: '70px',
              width: { lg: '470px', md: '400px', sm: '400px', xs: '100%' },
              zIndex: 1,
              display: { xs: 'none', sm: 'block' },
            }}
          >
            <img style={{ width: '100%', height: '450px' }} src={img} alt="" />
          </Box>
        </Box> */}
        {/* Right Section */}
<Box
  flex={1}
  position="relative"
  display="flex"
  justifyContent="center"
  alignItems="center"
>
  <Box
    position="absolute"
    width="80%"
    height="80%"
    border={`2px solid ${theme.palette.divider}`}
    borderRadius="20px"
    top="25%"
    left="25%"
    zIndex={0}
  />

  <Box
    sx={{
      marginLeft: { lg: '100px', md: '100px', xs: '0' },
      marginTop: '70px',
      width: { lg: '470px', md: '400px', sm: '400px', xs: '100%' },
      zIndex: 1,
      display: { xs: 'none', sm: 'block' },
    }}
  >
    <img style={{ width: '100%', height: '450px' }} src={img} alt="room preview" />
  </Box>
</Box>

      </Box>
    </LocalizationProvider>
  )
}
