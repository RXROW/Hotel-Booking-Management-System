// @ts-nocheck
import { Box, Typography, Chip, CardMedia } from '@mui/material';
import img1 from '../../../assets/imges/HBY/pic.png'
import img2 from '../../../assets/imges/HBY/pic (1).png'
import img3 from '../../../assets/imges/HBY/pic (2).png'
import img4 from '../../../assets/imges/HBY/pic (3).png'

interface House {
  image: string;
  title: string;
  desc: string;
  tag?: string;
}

export default function HousesWithBackYard() {
  const houses: House[] = [
    {
      image: img1,
      title: 'Tabby Town',
      desc: 'Gunung Batu, Indonesia',
      tag: 'Popular Choice',
    },
    {
      image: img2,
      title: 'Anggana',
      desc: 'Bogor, Indonesia',
    },
    {
      image: img3,
      title: 'Seattle Rain',
      desc: 'Jakarta, Indonesia',
    },
    {
      image: img4,
      title: 'Wodden Pit',
      desc: 'Wonosobo, Indonesia',
    },
  ];

  return (
    <Box component="section" sx={{ px: 2, py: 3 ,color:"#152C5B"}}>
      <Typography variant="h6" sx={{fontFamily: 'Poppins', fontWeight: 500, fontSize:"24px",mb: 3 }}>
        Houses with beauty backyard
      </Typography>

      <Box sx={{ display: 'flex', flexWrap: 'wrap',justifyContent:"space-between" }}>
        {houses.map((house, index) => (
          <Box key={index} sx={{width:280,cursor:"pointer"}}>
            <Box sx={{ position: 'relative', borderRadius: 3, overflow: 'hidden' }}>
              {house.tag && (
                <Chip
                  label={house.tag}
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
                image={house.image}
                alt={house.title}
                sx={{ borderRadius: 3, objectFit: 'cover' }}
              />
            </Box>
            <Box sx={{ mt: 1 }}>
              <Typography sx={{ fontWeight: 500 }}>{house.title}</Typography>
              <Typography sx={{ color: 'gray', fontSize: '14px' }}>{house.desc}</Typography>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
