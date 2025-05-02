import { useEffect, useState } from 'react'
import {
  Box,
  CircularProgress,
  Typography,
  Grid,
  Breadcrumbs,
  Link,
  Button,
} from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'
import NavigateNextIcon from '@mui/icons-material/NavigateNext'
import FavoriteIcon from '@mui/icons-material/Favorite'
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined'
import { privateInstance } from '../../services/apis/apisConfig'
import { FAVORITE_ROOMS } from '../../services/apis/apisUrls'
import { toast } from 'react-toastify'

const defaultRoomImage = 'https://placehold.co/600x400'

interface Room {
  _id: string
  images: string[]
  price: number
  roomNumber: string
  capacity: number
  discount: number
  facilities: string[]
  createdAt: string
  updatedAt: string
}

export default function Favorites() {
  const [favoriteRooms, setFavoriteRooms] = useState<Room[]>([])
  const [loading, setLoading] = useState(false)

  const getFavoriteRooms = async () => {
    try {
      setLoading(true)
      const response = await privateInstance.get(
        FAVORITE_ROOMS.GET_FAVORITE_ROOMS,
      )
      setFavoriteRooms(response?.data?.data?.favoriteRooms[0]?.rooms || [])
    } catch (error) {
      console.error('Error fetching favorite rooms:', error)
    } finally {
      setLoading(false)
    }
  }

  const removeFromFavorites = async (id: string) => {
    if (!id) {
      toast.error('Room ID is missing')
      return
    }
    try {
      const response = await privateInstance.delete(
        FAVORITE_ROOMS.REMOVE_FAVORITE(id),
        {data: { roomId: id }},
      )
      toast.success(response?.data?.message)
      getFavoriteRooms()
    } catch (error: any) {
      if (error?.response?.status === 401) {
        
      } else {
        toast.error(error?.response?.data?.message || 'An error occurred')
      }
    }
  }

  console.log(favoriteRooms[0]?._id)

  useEffect(() => {
    getFavoriteRooms()
  }, [])

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
          <Typography color="#152C5B" fontWeight={600}>
            Favorites
          </Typography>
        </Breadcrumbs>
      </Box>

      <Typography
        variant="h4"
        sx={{
          color: '#152C5B',
          textAlign: 'center',
          fontWeight: '600',
          mt: '20px',
          mb: '40px',
        }}
      >
        Your Favorites
      </Typography>

      <Typography
        sx={{
          color: '#152C5B',
          fontWeight: '500',
          fontSize: '24px',
          mb: '20px',
        }}
      >
        Your Rooms
      </Typography>

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
          <CircularProgress sx={{ color: 'primary.main' }} size="4rem" />
        </Box>
      ) : (
        <Grid container spacing={3}>
          {favoriteRooms?.length > 0 ? (
            favoriteRooms.map((room) => (
              <Grid item key={room._id} xs={12} sm={6} md={4}>
                <Box
                  sx={{
                    position: 'relative',
                    width: '100%',
                    height: '200px',
                    borderRadius: '15px',
                    overflow: 'hidden',
                    boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.08)',
                    transition: 'transform 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-5px)',
                    },
                    '&:hover .overlay': { opacity: 1 },
                  }}
                >
                  <img
                    src={
                      room.images && room.images.length > 0
                        ? room.images[0]
                        : defaultRoomImage
                    }
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                    }}
                    alt={room.roomNumber || 'Favorite Room'}
                  />

                  <Box
                    className="overlay"
                    sx={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      bgcolor: 'rgba(32, 63, 199, 0.21)',
                      opacity: 0,
                      transition: '0.4s ease',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '10px',
                    }}
                  >
                    <Box
                      sx={{
                        display: 'flex',
                        gap: '15px',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <Button onClick={() => removeFromFavorites(room._id)}>
                        <FavoriteIcon
                          sx={{ color: '#fff', fontSize: '32px' }}
                        />
                      </Button>
                      <Link to={`details-page/${room._id}`}>
                        <RemoveRedEyeOutlinedIcon
                          sx={{ color: '#fff', fontSize: '32px' }}
                        />
                      </Link>
                    </Box>
                  </Box>

                  {/* Room number */}
                  <Typography
                    sx={{
                      position: 'absolute',
                      bottom: '10px',
                      left: '10px',
                      color: '#fff',
                      backgroundColor: 'rgba(0,0,0,0.5)',
                      padding: '4px 8px',
                      borderRadius: '8px',
                      fontWeight: 'bold',
                      fontSize: '16px',
                    }}
                  >
                    {room.roomNumber}
                  </Typography>

                  {/* Price */}
                  <Typography
                    sx={{
                      position: 'absolute',
                      top: 0,
                      right: 0,
                      backgroundColor: '#FF498B',
                      color: '#fff',
                      borderRadius: '0 8px 0 8px',
                      px: 3,
                      py: 1,
                      fontSize: '14px',
                    }}
                  >
                    ${room.price} per night
                  </Typography>
                </Box>
              </Grid>
            ))
          ) : (
            <Grid item xs={12}>
              <Box sx={{ textAlign: 'center', py: 5 }}>
                <Typography variant="h6" color="text.secondary">
                  No favorite rooms found
                </Typography>
              </Box>
            </Grid>
          )}
        </Grid>
      )}
    </Box>
  )
}
