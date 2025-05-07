import { styled } from '@mui/material'
import { Typography } from '@mui/material'
import { Box, Stack } from '@mui/system'
import { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import BadRoom from '../../assets/icons/ic_bedroom (2).png'
import Tv from '../../assets/icons/ic_tv.png'
import wifi from '../../assets/icons/ic_wifi 1.png'
import livingroom from '../../assets/icons/ic_livingroom.png'
import kitchen from '../../assets/icons/ic_kulkas.png'
import bathroom from '../../assets/icons/baino.png'
import dinnerroom from '../../assets/icons/ic_diningroom 1.png'
import table from '../../assets/icons/ic_ac 1.png'
import image1 from '../../assets/imges/cabin-001.jpg'
import image2 from '../../assets/imges/cabin-002.jpg'
import { publicInstance } from '../../services/apis/apisConfig'
import { ROOM_URL_USER } from '../../services/apis/apisUrls'
import BookingCard from '../shared/components/BookingCard/BookingCard'
import CommentForm from '../shared/components/CommentForm/CommentForm'
import ReviewForm from '../shared/components/ReviewForm/ReviewForm'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { AuthContext } from '../../context/AuthContext'
export default function DetailsPage() {
  const params = useParams()
  const RoomId = params.roomId
  const [RoomDetails, setRoomDetails] = useState()
  const defaultImages = [image1, image2]
  const { loginData } = useContext(AuthContext)
  console.log(loginData)
  async function GetRoomDetails() {
    try {
      const response = await publicInstance.get(ROOM_URL_USER.GET_ROOM(RoomId))
      console.log(response)
      setRoomDetails(response.data.data.room)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    GetRoomDetails()
  }, [RoomId])
  const facilitiesData = [
    { icon: BadRoom, number: 5, name: 'bed room' },
    { icon: Tv, number: 4, name: 'television' },
    { icon: wifi, number: 6, name: 'wifi' },
    { icon: livingroom, number: 2, name: 'living room' },
    { icon: kitchen, number: 1, name: 'kitchen' },
    { icon: bathroom, number: 6, name: 'bathroom' },
    { icon: dinnerroom, number: 8, name: 'dinnerroom' },
    { icon: table, number: 5, name: 'table' },
  ]
  const getDisplayImages = (urls) => {
    if (urls?.length < 3) {
      return [...urls, ...defaultImages].slice(0, 3)
    }
    return urls?.slice(-3)
  }
  const ImgsStyles = {
    borderRadius: '1rem',
    width: '100%',
    height: '100%',
  }
  const VerticalLine = styled(Box)(({ theme }) => ({
    width: '3px',
    backgroundColor: '#203FC7',
    margin: '0 30px',
    display: 'block',
    height: '350px',
    [theme.breakpoints.down('lg')]: {
      height: '3px',
      width: '100%',
    },
  }))
  const displayImages = getDisplayImages(RoomDetails?.images)
  return (
    <div>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          margin: '20px 0',
        }}
      >
        <Box
          sx={{
            width: '80%',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Typography variant="h6" component="h6">
              Home / Room Details
            </Typography>
            <Stack>
              <Typography
                variant="h6"
                component="h1"
                sx={{ fontSize: '32px', fontWeight: 'bold' }}
              >
                Village Angga
              </Typography>
              <Typography
                variant="body1"
                component="h3"
                sx={{ fontWeight: '500' }}
              >
                Bogor, Indonesia
              </Typography>
            </Stack>
          </Box>
          <Stack
            direction={{ xs: 'column', md: 'row' }}
            spacing={3}
            sx={{
              marginBlock: '3.125rem',
              height: { xs: 'auto', md: '600px' },
            }}
          >
            <Stack
              flex={2}
              sx={{
                height: { xs: '300px', md: '100%' },
              }}
            >
              {displayImages?.[0] && (
                <img
                  src={displayImages[0]}
                  style={{ ...ImgsStyles, objectFit: 'cover' }}
                  alt="Room view main"
                />
              )}
            </Stack>
            <Stack flex={1} spacing={2} sx={{ height: '100%' }}>
              <Box sx={{ flex: 1 }}>
                {displayImages?.[1] && (
                  <img
                    src={displayImages[1]}
                    style={{ ...ImgsStyles, objectFit: 'cover' }}
                    alt="Room view second"
                  />
                )}
              </Box>
              <Box sx={{ flex: 1 }}>
                {displayImages?.[2] && (
                  <img
                    src={displayImages[2]}
                    style={{ ...ImgsStyles, objectFit: 'cover' }}
                    alt="Room view third"
                  />
                )}
              </Box>
            </Stack>
          </Stack>
          <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
            <Stack flex={1} spacing={3}>
              <Typography sx={{ textAlign: 'start', color: '#B0B0B0' }}>
                Minimal techno is a minimalist subgenre of techno music. It is
                characterized by a stripped-down aesthetic that exploits the use
                of repetition and understated development. Minimal techno is
                thought to have been originally developed in the early 1990s by
                Detroit-based producers Robert Hood and Daniel Bell.
                <br />
                Such trends saw the demise of the soul-infused techno that
                typified the original Detroit sound. Robert Hood has noted that
                he and Daniel Bell both realized something was missing from
                techno in the post-rave era.
                <br />
                Design is a plan or specification for the construction of an
                object or system or for the implementation of an activity or
                process, or the result of that plan or specification in the form
                of a prototype, product or process. The national agency for
                design: enabling Singapore to use design for economic growth and
                to make lives better.
              </Typography>
              <Stack
                direction="row"
                flexWrap="wrap"
                gap={2}
                sx={{ marginTop: '1.875rem' }}
              >
                {facilitiesData.map((facility) => (
                  <Stack
                    key={facility.name}
                    direction="column"
                    sx={{ minWidth: '140px' }}
                  >
                    <Box>
                      <img src={facility.icon} alt={facility.name} />
                    </Box>
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <Typography variant="h6">{facility.number}</Typography>
                      <Typography>{facility.name}</Typography>
                    </Stack>
                  </Stack>
                ))}
              </Stack>
            </Stack>
            <Stack flex={1}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <BookingCard
                  roomId={RoomDetails?._id}
                  totalPrice={RoomDetails?.price}
                  discount={RoomDetails?.discount}
                  capacity={RoomDetails?.capacity}
                />
              </LocalizationProvider>
            </Stack>
          </Stack>
        </Box>
        {loginData?.role === 'user' && (
          <Box
            sx={{
              width: 'max-Content',
              border: '1px solid #ddd',
              borderRadius: '8px',
              padding: ' 2rem 4rem',
              gap: '2rem',
              margin: '30px 0 ',
              display: 'flex',
              justifyContent: 'space-evenly',
              flexDirection: {
                xs: 'column',
                lg: 'row',
              },
              alignItems: 'end',
            }}
          >
            <ReviewForm roomId={RoomId} />
            <VerticalLine />
            <CommentForm roomId={RoomId} />
          </Box>
        )}
      </Box>
    </div>
  )
}
