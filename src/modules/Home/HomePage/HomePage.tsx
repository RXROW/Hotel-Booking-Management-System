import React from 'react'
import BookingSection from '../BookingSection/BookingSection'
import { Box } from '@mui/material'
import MostPopAds from '../MostPopAds/MostPopAds'
import HousesWithBackYard from '../HousesWithBackYard/HousesWithBackYard'
import HotelsWithBigLv from '../HotelsWithBigLv/HotelsWithBigLv'
import AdsSection from '../AdsSection/AdsSection'
import Reviews from '../Reviews/Reviews'

const HomePage = () => {
  return (
    <>
      <Box paddingX={10}>
      {/* =============================== Booking Section ======================== */}
              <BookingSection/>
      {/* =============================== Booking Section ======================== */}

        {/* =============================== Most Pop Ads Section ======================== */}
              <MostPopAds/>
        {/* =============================== Most Pop Ads Section ======================== */}

        {/* =============================== Houses with Back Yard Section ======================== */}
              <HousesWithBackYard/>
        {/* =============================== Houses with Back Yard Section ======================== */}

        {/* =============================== Hotels with Big Living Room Section ======================== */}
              <HotelsWithBigLv/>
        {/* =============================== Hotels with Big Living Room Section ======================== */}

        {/* =============================== Ads Section ======================== */}
              <AdsSection/>
        {/* =============================== Ads Section ======================== */}

        {/* =============================== Reviews Section ======================== */}
              <Reviews/>
        {/* =============================== Reviews Section ======================== */}

        
      </Box>
    </>
  )
}

export default HomePage
