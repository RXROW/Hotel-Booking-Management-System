import Slider, { Settings } from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { Box } from '@mui/material'
import { useRef } from 'react'
import ReviewCard from './ReviewCard'
import { reviewData } from './ReviewData'

const Reviews = () => {
  const sliderRef = useRef<Slider>(null)

  const next = () => sliderRef.current?.slickNext()
  const prev = () => sliderRef.current?.slickPrev()

  const settings: Settings = {
    dots: false,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  }

  return (
    <Box
      sx={{ display: 'flex', flexDirection: 'column', paddingBottom: '50px' }}
      id="reviews"
    >
      <Slider {...settings} ref={sliderRef}>
        {reviewData.map((item, index) => (
          <ReviewCard key={index} item={item} prev={prev} next={next} />
        ))}
      </Slider>
    </Box>
  )
}

export default Reviews
