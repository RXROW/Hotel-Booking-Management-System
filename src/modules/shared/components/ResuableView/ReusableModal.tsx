/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Modal, Box, Typography, Button, Divider } from '@mui/material'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Slider, { Settings } from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { useTheme } from '@mui/material/styles'
// import { Box, Typography, Card, CardContent, Grid } from "@mui/material";
// Styles for the modal

// interface ReusableModalProps {
//   open: boolean;
//   onClose: () => void;
//   title: string;
//   children: React.ReactNode; // Allows passing dynamic content
//   actions?: React.ReactNode; // Optional footer actions (e.g., buttons)
// }

const ReusableModal = ({ open, onClose, details }) => {
  console.log(details)
  const theme = useTheme()
  const Overlay = {
    backdropFilter: 'blur(4px)',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  }
  const settings: Settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
  }

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    height: 500,
    overflowY: 'auto',
    bgcolor: theme.palette.mode === 'light' ? 'background.paper' : '#1e1e1e',
    p: 4,
    borderRadius: '8px',
    outline: 'none',
  }

  return (
    <Modal
      sx={Overlay}
      open={open}
      onClose={onClose}
      aria-labelledby="modal-title"
    >
      <Box sx={style}>
        <Typography
          variant="h5"
          gutterBottom
          sx={{
            fontWeight: 'bold',
            textAlign: 'center',
            color: theme.palette.text.primary,
          }}
        >
          Room Details
        </Typography>
        <Divider sx={{ mb: 2 }} />
        <Box>
          <Box
            sx={{
              height: 300,
              mb: 2,
              '.slick-slider': {
                '& .slick-prev, & .slick-next': {
                  zIndex: 1000,
                  '&:before': {
                    color: theme.palette.primary.main,
                    fontSize: '24px',
                  },
                },
                '& .slick-dots': {
                  bottom: 10,
                  '& li button:before': {
                    color: theme.palette.primary.main,
                  },
                },
              },
            }}
          >
            <Slider {...settings}>
              {details?.images?.map((img, index) => (
                <Box key={index}>
                  <img
                    src={img}
                    alt={`Room ${index + 1}`}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                    }}
                  />
                </Box>
              ))}
            </Slider>
          </Box>
          <Box>
            <Typography
              variant="h6"
              sx={{ color: theme.palette.text.primary, mb: 1 }}
            >
              Room Number: {details?.roomNumber}
            </Typography>
            <Typography
              variant="h6"
              sx={{ color: theme.palette.text.primary, mb: 1 }}
            >
              Capacity: {details?.capacity} Person
            </Typography>
            <Typography
              variant="h6"
              sx={{ color: theme.palette.text.primary, mb: 1 }}
            >
              Discount: {details?.discount}%
            </Typography>
            <Typography
              variant="h6"
              sx={{ color: theme.palette.text.primary, mb: 1 }}
            >
              Price: ${details?.price}
            </Typography>
            <Typography
              variant="h6"
              sx={{ color: theme.palette.text.primary, mb: 1 }}
            >
              Created By: {details?.createdBy?.userName}
            </Typography>
            <Typography
              variant="h6"
              sx={{ color: theme.palette.text.primary, mb: 1 }}
            >
              Created At: {new Date(details?.createdAt).toLocaleDateString()}
            </Typography>
            <Typography
              variant="h6"
              sx={{ color: theme.palette.text.primary, mb: 1 }}
            >
              Updated At: {new Date(details?.updatedAt).toLocaleDateString()}
            </Typography>
            <Typography
              variant="h6"
              sx={{ color: theme.palette.text.primary, mb: 1 }}
            >
              facilities :
              {details?.facilities.map((item) => item.name).join('-')}
            </Typography>
          </Box>
          <Box sx={{ textAlign: 'end', p: 2 }}>
            <Button
              variant="contained"
              onClick={onClose}
              sx={{
                bgcolor: theme.palette.mode === 'light' ? '#203FC7' : '#1976d2',
                '&:hover': {
                  bgcolor:
                    theme.palette.mode === 'light' ? '#1834A8' : '#1565c0',
                },
              }}
            >
              Close
            </Button>
          </Box>
        </Box>
      </Box>
    </Modal>
  )
}
export default ReusableModal
