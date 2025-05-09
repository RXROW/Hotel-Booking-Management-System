import { Box, Rating, Typography } from '@mui/material'
import ArrowCircleLeftOutlinedIcon from '@mui/icons-material/ArrowCircleLeftOutlined'
import ArrowCircleRightOutlinedIcon from '@mui/icons-material/ArrowCircleRightOutlined'
import StarIcon from '@mui/icons-material/Star'
import {
  StyledArrowBox,
  StyledBoxContent,
  StyledImgBox,
  StyledPersonText,
} from './ReviewStyles'

type ReviewProps = {
  item: {
    img: string
    title: string
    rate: JSX.Element
    comment: string
    person: string
  }
  prev: () => void
  next: () => void
}

const ReviewCard = ({ item, prev, next }: ReviewProps) => {
  return (
    <Box
      sx={{
        display: 'flex !important',
        flexDirection: {
          xs: 'column',
          md: 'row',
        },
        gap: {
          xs: '0px',
          sm: '80px',
        },
        height: {
          xs: 'auto',
          md: '780px',
        },
        alignItems: {
          xs: 'center',
        },
        paddingInline: {
          xs: '10px',
          sm: '0px',
        },
      }}
    >
      {/* Left Side */}
      <Box
        sx={{ display: 'flex !important', flexDirection: 'column !important' }}
      >
        <StyledImgBox
          sx={{
            width: { xs: '240px', sm: '356px', lg: '450px' },
            height: { xs: 'auto', sm: '560px', lg: '560px' },
            marginTop: { xs: '4rem', sm: '2.5rem' },
            marginInline: { xs: 'auto', sm: '0rem' },
          }}
        >
          <Box
            component={'img'}
            src={item.img}
            sx={{
              width: { xs: '100%', sm: '356px', lg: '450px' },
              height: { xs: '300px', sm: '560px', lg: '560px' },
              paddingX: { xs: '10px' },
              objectFit: 'cover',
              borderRadius: '15px 15px 100px 15px',
              position: { xs: 'static', sm: 'absolute' },
              top: { sm: '40px' },
              left: { sm: '40px' },
              zIndex: 10,
            }}
          />
        </StyledImgBox>
      </Box>

      {/* Right Side */}
      <StyledBoxContent sx={{ paddingInline: { xs: '2rem', sm: '0rem' } }}>
        <Typography variant="h6" sx={{ fontWeight: '500', fontSize: '24px' }}>
          {item.title}
        </Typography>

        <Box sx={{ textAlign: { xs: 'center', md: 'start' } }}>{item.rate}</Box>

        <Typography
          variant="h6"
          sx={{
            maxWidth: '595px',
            fontSize: { xs: '20px', sm: '32px' },
            paddingTop: '8px',
          }}
        >
          {item.comment}
        </Typography>

        <StyledPersonText variant="h6">{item.person}</StyledPersonText>

        <StyledArrowBox>
          <ArrowCircleLeftOutlinedIcon
            onClick={prev}
            sx={{
              color: '#203FC7',
              cursor: 'pointer',
              fontSize: '57px',
              zIndex: 10,
            }}
          />
          <ArrowCircleRightOutlinedIcon
            onClick={next}
            sx={{
              color: '#203FC7',
              cursor: 'pointer',
              fontSize: '57px',
              zIndex: 10,
            }}
          />
        </StyledArrowBox>
      </StyledBoxContent>
    </Box>
  )
}

export default ReviewCard
