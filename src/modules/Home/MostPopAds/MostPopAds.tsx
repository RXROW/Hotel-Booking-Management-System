import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import FavoriteIcon from '@mui/icons-material/Favorite'
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined'
import { useEffect, useState } from 'react'
import Skeleton from '@mui/material/Skeleton'
import { Link } from 'react-router-dom'
import { Button } from '@mui/material'
import { toast } from 'react-toastify'
import { privateInstance } from '../../../services/apis/apisConfig'
import { ADS_URL_USER, FAVORITE_ROOMS } from '../../../services/apis/apisUrls'
import AuthModal from '../../shared/components/AuthModal/AuthModal'
import fallback from '../../../assets/imges/fallback-bed.webp'

interface room {
  _id: string
  images: string
  price: number
  roomNumber: string
}

interface adsData {
  room: room
}

export default function MostPopAds() {
  const [ads, setAds] = useState<adsData[]>([])
  const [loading, setLoading] = useState(true)
  const [authModalOpen, setAuthModalOpen] = useState(false)

  const getAds = async () => {
    try {
      const res = await privateInstance.get(ADS_URL_USER.GET_ADS)
      console.log(res)
      setAds(res?.data?.data?.ads || [])
    } catch (error) {
      console.log(error)
    }
  }

  const addToFavorite = async (id: string) => {
    try {
      const res = await privateInstance.post(FAVORITE_ROOMS.ADD_TO_FAVORITE, {
        roomId: id,
      })
      console.log(res)
      toast.success(res?.data?.message)
    } catch (error: any) {
      if (error?.response?.status === 401) {
        setAuthModalOpen(true)
      } else {
        toast.error(error?.response?.data?.message || 'An error occurred')
      }
    }
  }

  useEffect(() => {
    getAds()
    setTimeout(() => {
      setLoading(false)
    }, 2000)
  }, [])

  return (
    <Box
      component="section"
      sx={{
        margin: '0 auto',
        color: '#3252DF',
        padding: { xs: '0', md: '20px' },
      }}
    >
      <Typography
        variant="h6"
        sx={{
          fontFamily: 'Poppins',
          fontWeight: 500,
          fontSize: '24px',
          mb: 2,
        }}
      >
        Most popular ads
      </Typography>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: '0.7fr 1fr' },
          gap: '20px',
        }}
      >
        <Box
          sx={{
            position: 'relative',
            overflow: 'hidden',
            borderRadius: '12px',
            height: { xs: '250px', md: '100%' },
            minHeight: { md: '400px' },
            backgroundColor: '#eee',
            cursor: 'pointer',
            '&:hover .overlay': { opacity: 1 },
          }}
        >
          {loading ? (
            <Skeleton variant="rounded" width="100%" height="100%" />
          ) : (
            <>
              <img
                src={
                  Array.isArray(ads[0]?.room?.images)
                    ? ads[0]?.room?.images[0] || fallback
                    : ads[0]?.room?.images || fallback
                }
                alt="room"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
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
                  <Button onClick={() => addToFavorite(ads[0]?.room?._id)}>
                    <FavoriteIcon sx={{ color: '#fff', fontSize: '32px' }} />
                  </Button>
                  <Link to={`details-page/${ads[0]?.room._id}`}>
                    <RemoveRedEyeOutlinedIcon
                      sx={{ color: '#fff', fontSize: '32px' }}
                    />
                  </Link>
                </Box>

                <Typography
                  sx={{
                    position: 'absolute',
                    bottom: '10px',
                    color: '#fff',
                    backgroundColor: 'rgba(0,0,0,0.5)',
                    padding: '4px 8px',
                    borderRadius: '8px',
                    fontWeight: 'bold',
                    fontSize: '16px',
                  }}
                >
                  {ads[0]?.room?.roomNumber}
                </Typography>
              </Box>

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
                ${ads[0]?.room?.price} per night
              </Typography>
            </>
          )}
        </Box>

        <Box
          sx={{
            display: { xs: 'flex', md: 'grid' },
            gridTemplateColumns: '1fr 1fr',
            gridTemplateRows: '1fr 1fr',
            flexDirection: { xs: 'column', md: 'unset' },
            gap: '15px',
          }}
        >
          {ads.slice(1, 5).map((item: adsData, index) => (
            <Box
              key={index}
              sx={{
                position: 'relative',
                overflow: 'hidden',
                borderRadius: '12px',
                backgroundColor: '#eee',
                height: { xs: '250px', md: '190px' },
                cursor: 'pointer',
                '&:hover .overlay': { opacity: 1 },
              }}
            >
              {loading ? (
                <Skeleton variant="rounded" width="100%" height="100%" />
              ) : (
                <>
                  <img
                    src={
                      Array.isArray(item?.room?.images)
                        ? item?.room?.images[0] || fallback
                        : item?.room?.images || fallback
                    }
                    alt="room"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                    }}
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
                      <Button onClick={() => addToFavorite(item?.room?._id)}>
                        <FavoriteIcon
                          sx={{ color: '#fff', fontSize: '28px' }}
                        />
                      </Button>
                      <Link to={`details-page/${item.room._id}`}>
                        <RemoveRedEyeOutlinedIcon
                          sx={{ color: '#fff', fontSize: '28px' }}
                        />
                      </Link>
                    </Box>

                    <Typography
                      sx={{
                        position: 'absolute',
                        bottom: '10px',
                        color: '#fff',
                        backgroundColor: 'rgba(0,0,0,0.5)',
                        padding: '4px 8px',
                        borderRadius: '8px',
                        fontWeight: 'bold',
                        fontSize: '14px',
                      }}
                    >
                      {item?.room?.roomNumber}
                    </Typography>
                  </Box>

                  <Typography
                    sx={{
                      position: 'absolute',
                      top: 0,
                      right: 0,
                      backgroundColor: '#FF498B',
                      color: '#fff',
                      borderRadius: '0 8px 0 8px',
                      px: 2,
                      py: 1,
                      fontSize: '12px',
                    }}
                  >
                    ${item.room.price} per night
                  </Typography>
                </>
              )}
            </Box>
          ))}
        </Box>
      </Box>

      {/* Auth Modal */}
      <AuthModal open={authModalOpen} onClose={() => setAuthModalOpen(false)} />
    </Box>
  )
}
