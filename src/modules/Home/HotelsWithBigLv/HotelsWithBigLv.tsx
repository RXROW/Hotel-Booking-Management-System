import React from 'react'
import { Box, Typography, Chip, CardMedia } from '@mui/material';
import img1 from '../../../assets/imges/HBL/pic.png'
import img2 from '../../../assets/imges/HBL/pic (1).png'
import img3 from '../../../assets/imges/HBL/pic (2).png'
import img4 from '../../../assets/imges/HBL/pic (3).png'

interface Hotel {
  image: string;
  title: string;
  desc: string;
  tag?: string;
}

const HotelsWithBigLv = () => {
    const hotels: Hotel[] = [
        {
          image: img1,
          title: 'Green Park',
          desc: 'Tangerang, Indonesia',
        },
        {
          image: img2,
          title: 'Podo Wae',
          desc: 'Madiun, Indonesia',
        },
        {
          image: img3,
          title: 'Silver Rain',
          desc: 'Bandung, Indonesia',
        },
        {
          image: img4,
          title: 'Cashville',
          desc: 'Kemang, Indonesia',
          tag: 'Popular Choice',
        },
      ];
  return (
    <>
      <Box component="section" sx={{ px: 2, py: 3  ,color:"#152C5B"}}>
            <Typography variant="h6" sx={{fontFamily: 'Poppins', fontWeight: 500, fontSize:"24px",mb: 3 }}>
            Hotels with large living room
            </Typography>
      
            <Box sx={{ display: 'flex', flexWrap: 'wrap',justifyContent:"space-between" }}>
              {hotels.map((hotel, index) => (
                <Box key={index} sx={{width:280,cursor:"pointer"}}>
                  <Box sx={{ position: 'relative', borderRadius: 3, overflow: 'hidden' }}>
                    {hotel.tag && (
                      <Chip
                        label={hotel.tag}
                        sx={{
                          position: 'absolute',
                          top: 0,
                          right: 0,
                          fontSize: '12px',
                          backgroundColor: '#FF498B',
                          color: 'white',
                          zIndex: 1,
                          borderRadius:"0 5px 0 15px"
                        }}
                      />
                    )}
                    <CardMedia
                      component="img"
                      height="160"
                      image={hotel.image}
                      alt={hotel.title}
                      sx={{ borderRadius: 3, objectFit: 'cover' }}
                    />
                  </Box>
                  <Box sx={{ mt: 1 }}>
                    <Typography sx={{ fontWeight: 500 }}>{hotel.title}</Typography>
                    <Typography sx={{ color: 'gray', fontSize: '14px' }}>{hotel.desc}</Typography>
                  </Box>
                </Box>
              ))}
            </Box>
          </Box>
    </>
  )
}

export default HotelsWithBigLv
