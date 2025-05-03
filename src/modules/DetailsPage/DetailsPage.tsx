import { Grid, styled } from '@mui/material'
import { Typography } from '@mui/material'
import { Box, Stack } from '@mui/system'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import BadRoom from '../../assets/icons/ic_bedroom (2).png'
import Tv from '../../assets/icons/ic_tv.png'
import image1 from '../../assets/imges/cabin-001.jpg'
import image2 from '../../assets/imges/cabin-002.jpg'
import { useAuthContext } from '../../context/AuthContext'
import { publicInstance } from '../../services/apis/apisConfig'
import { ROOM_URL_USER } from '../../services/apis/apisUrls'
import BookingCard from '../shared/components/BookingCard/BookingCard'
import CommentForm from '../shared/components/CommentForm/CommentForm'
import Footer from '../shared/components/Footer/Footer'
import ReviewForm from '../shared/components/ReviewForm/ReviewForm'
interface Facilitydetails {
  icon: string
  number: number
  name: string
}
interface ImageStyles {
  borderRadius: string
  width: string
  height: string
}
export default function DetailsPage() {
  //   const params = useParams();
  //   const RoomId = params.roomid;
  // for test
  const RoomId = `66f9d1246475e2d50da9d22c`
  const [RoomDetails, setRoomDetails] = useState()
  console.log(RoomDetails)
  const defaultImages: string[] = [image1, image2]
  async function GetRoomDetails(): Promise<void> {
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
  const facilitiesData: Facilitydetails[] = [
    { icon: BadRoom, number: 5, name: 'bed room' },
    { icon: Tv, number: 4, name: 'television' },
    { icon: Tv, number: 4, name: 'television' },
    { icon: Tv, number: 4, name: 'television' },
    { icon: Tv, number: 4, name: 'television' },
    { icon: Tv, number: 4, name: 'television' },
    { icon: Tv, number: 4, name: 'television' },
    { icon: Tv, number: 4, name: 'television' },
  ]
  const getDisplayImages = (urls?: string[]): string[] => {
    if (!urls || urls.length < 3) {
      return [...(urls || []), ...defaultImages].slice(0, 3)
    }
    return urls.slice(-3)
  }
  const ImgsStyles: ImageStyles[] = {
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
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant="h6" component="h6">
              Home / Room Details
            </Typography>
            <Stack>
              <Typography
                variant="h4"
                component="h1"
                sx={{ color: '#152C5B', fontWeight: 'bold' }}
              >
                Village Angga
              </Typography>
              <Typography
                variant="body1"
                component="h3"
                sx={{ color: '#B0B0B0', fontWeight: '500' }}
              >
                Bogor, Indonesia
              </Typography>
            </Stack>
          </Box>
          <Grid
            container
            spacing={3}
            sx={{ marginBlock: '3.125rem', minHeight: '500px' }}
          >
            <Grid
              size={{ sm: 12, md: 6 }}
              sx={{
                gridRow: 'span 2',
              }}
            >
              {displayImages?.[0] && (
                <img src={displayImages[0]} style={ImgsStyles} />
              )}
            </Grid>
            <Grid container spacing={2} size={{ sm: 12, md: 6 }}>
              <Grid size={12}>
                {displayImages?.[1] && (
                  <img src={displayImages[1]} style={ImgsStyles} />
                )}
              </Grid>
              <Grid size={12}>
                {displayImages?.[2] && (
                  <img src={displayImages[2]} style={ImgsStyles} />
                )}
              </Grid>
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid size={{ sm: 12, md: 6 }}>
              <Typography sx={{ textAlign: 'start', color: '#B0B0B0' }}>
                Minimal techno is a minimalist subgenre of techno music. It is
                characterized by a stripped-down aesthetic that exploits the use
                of repetition and understated development. Minimal techno is
                thought to have been originally developed in the early 1990s by
                Detroit-based producers Robert Hood and Daniel Bell.
                <br></br>
                Such trends saw the demise of the soul-infused techno that
                typified the original Detroit sound. Robert Hood has noted that
                he and Daniel Bell both realized something was missing from
                techno in the post-rave era.
                <br></br>
                Design is a plan or specification for the construction of an
                object or system or for the implementation of an activity or
                process, or the result of that plan or specification in the form
                of a prototype, product or process. The national agency for
                design: enabling Singapore to use design for economic growth and
                to make lives better.
              </Typography>
              <Box
                display="flex"
                gap="3.125rem"
                flexWrap="wrap"
                sx={{ marginBlockStart: '1.875rem' }}
              >
                {facilitiesData.map((facility) => (
                  <Stack alignItems=" flex-start" key={facility.name}>
                    <Box>
                      <img src={facility.icon} />
                    </Box>
                    <Box component="div">
                      <Typography
                        component="span"
                        sx={{ paddingRight: '8px', color: '#152C5B' }}
                      >
                        {facility.number}
                      </Typography>
                      <Typography component="span">{facility.name}</Typography>
                    </Box>
                  </Stack>
                ))}
              </Box>
            </Grid>
            <Grid size={{ sm: 12, md: 6 }}>
              <BookingCard
                roomId={RoomDetails?._id}
                totalPrice={RoomDetails?.price}
                discount={RoomDetails?.discount}
                capacity={RoomDetails?.capacity}
              />
            </Grid>
          </Grid>
        </Box>
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
      </Box>
      <Footer />
    </div>
  )
}
