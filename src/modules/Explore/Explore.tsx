// @ts-nocheck
import { useEffect, useState } from 'react'
import {
  Box,
  CircularProgress,
  Typography,
  Grid,
  Chip,
  Breadcrumbs,
  Link,
} from '@mui/material'
import { useSearchParams, Link as RouterLink } from 'react-router-dom'
import NavigateNextIcon from '@mui/icons-material/NavigateNext'
import { publicInstance } from '../../services/apis/apisConfig'
import { ROOMS_URL } from '../../services/apis/apisUrls'

const defaultRoomImage = 'https://placehold.co/600x400'

export default function Explore() {
  const [availableRooms, setAvailableRooms] = useState([])
  const [loading, setLoading] = useState(false)

  const [searchParams] = useSearchParams()
  const startDate = searchParams.get('startDate')
  const endDate = searchParams.get('endDate')

  const getAvailableRooms = async () => {
    try {
      setLoading(true)

      const response = await publicInstance.get(
        ROOMS_URL.GET_ALL_ROOMS_FOR_USER,
        {
          params: {
            startDate,
            endDate,
          },
        },
      )

      setAvailableRooms(response.data.data.rooms)
    } catch (error) {
      console.error('Error fetching available rooms:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getAvailableRooms()
  }, [startDate, endDate])

  return (
    <Box sx={{ maxWidth: '1400px', margin: '0 auto', padding: '20px' }}>
      {/* Breadcrumb Navigation */}
      <Box sx={{ py: 2, mb: 2 }}>
        <Breadcrumbs
          separator={<NavigateNextIcon fontSize="small" />}
          aria-label="breadcrumb"
        >
          <Link
            component={RouterLink}
            to="/"
            color="inherit"
            underline="hover"
            sx={{ color: '#B0B0B0', fontWeight: 500 }}
          >
            Home
          </Link>
          <Typography variant="h6" fontWeight={600}>
            Explore
          </Typography>
        </Breadcrumbs>
      </Box>

      <Typography
        variant="h6"
        sx={{
          textAlign: 'center',
          fontWeight: '600',
          fontSize: '32px',
          mt: '20px',
          mb: '20px',
        }}
      >
        Explore ALL Rooms
      </Typography>

      <Grid container alignItems="center" spacing={2} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6">Find Your Perfect Stay</Typography>
        </Grid>
        <Grid item xs={12} sm={6} sx={{ textAlign: 'right' }}>
          {startDate && endDate && (
            <Typography variant="body2" color="text.secondary">
              Showing availability from{' '}
              {new Date(startDate).toLocaleDateString()} to{' '}
              {new Date(endDate).toLocaleDateString()}
            </Typography>
          )}
        </Grid>
      </Grid>

      <Typography
        variant="h6"
        sx={{
          fontWeight: '500',
          fontSize: '24px',
          mb: '20px',
        }}
      >
        All Rooms
      </Typography>

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
          <CircularProgress sx={{ color: 'primary.main' }} size="4rem" />
        </Box>
      ) : (
        <Grid container spacing={3}>
          {availableRooms?.length > 0 ? (
            availableRooms.map((room, index) => (
              <Grid item key={index} xs={12} sm={6} md={4}>
                <RoomCard room={room} />
              </Grid>
            ))
          ) : (
            <Grid item xs={12}>
              <Box sx={{ textAlign: 'center', py: 5 }}>
                <Typography variant="h6" color="text.secondary">
                  No rooms available for the selected dates
                </Typography>
              </Box>
            </Grid>
          )}
        </Grid>
      )}
    </Box>
  )
}

// Extracted room card component for better organization
const RoomCard = ({ room }) => {
  const [imageError, setImageError] = useState(false)

  // Handle image loading errors
  const handleImageError = () => {
    setImageError(true)
  }

  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        height: '250px',
        borderRadius: '15px',
        overflow: 'hidden',
        boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.08)',
        transition: 'transform 0.3s ease',
        '&:hover': {
          transform: 'translateY(-5px)',
        },
      }}
    >
      <img
        src={
          !imageError && room.images && room.images.length > 0
            ? room.images[0]
            : defaultRoomImage
        }
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
        }}
        alt={`Room ${room.roomNumber || ''}`}
        onError={handleImageError}
      />

      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background:
            'linear-gradient(180deg, rgba(0, 0, 0, 0) 50%, rgba(0, 0, 0, 0.6))',
          zIndex: 1,
        }}
      />

      {/* Price tag */}
      <Typography
        variant="h5"
        sx={{
          position: 'absolute',
          color: '#FFFFFF',
          fontWeight: '500',
          fontSize: '16px',
          top: '0',
          right: '0',
          backgroundColor: '#FF498B',
          borderRadius: '0px 15px',
          padding: '10px 15px',
          zIndex: 2,
        }}
      >
        ${room.price}
        <span style={{ fontWeight: '300' }}> per night</span>
      </Typography>

      {/* Discount badge if available */}
      {room.discount > 0 && (
        <Chip
          label={`${room.discount}% OFF`}
          color="error"
          sx={{
            position: 'absolute',
            top: '10px',
            left: '10px',
            fontWeight: 'bold',
            zIndex: 2,
          }}
        />
      )}

      {/* Booked status */}
      {room.isBooked && (
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%) rotate(-30deg)',
            backgroundColor: 'rgba(0,0,0,0.7)',
            color: 'white',
            padding: '8px 30px',
            zIndex: 3,
            fontWeight: 'bold',
          }}
        >
          BOOKED
        </Box>
      )}

      {/* Room name/number */}
      <Typography
        variant="h5"
        sx={{
          position: 'absolute',
          color: '#FFFFFF',
          fontWeight: '400',
          bottom: '3.5rem',
          left: '1.5rem',
          fontSize: '20px',
          zIndex: 2,
        }}
      >
        Room {room.roomNumber || ''}
      </Typography>

      {/* Capacity info */}
      <Typography
        variant="h5"
        sx={{
          position: 'absolute',
          color: '#FFFFFF',
          fontWeight: '300',
          bottom: '2rem',
          left: '1.5rem',
          fontSize: '15px',
          zIndex: 2,
        }}
      >
        Capacity: {room.capacity || 0} guests
      </Typography>
    </Box>
  )
}
