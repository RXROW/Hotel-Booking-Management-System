import { useEffect, useState } from 'react';
import { Box, Typography, Chip, CardMedia } from '@mui/material';
import { privateInstance } from '../../../services/apis/apisConfig';
import { ADS_URL_USER } from '../../../services/apis/apisUrls';

interface Room {
  images: string[];
  price: number;
  roomNumber: string;
  discount?: number;
}

interface AdsData {
  _id: number; 
  room: Room;
}

export default function AdsSection() {
  const [ads, setAds] = useState<AdsData[]>([]);
  const [loading, setLoading] = useState(true);

  const getAds = async () => {
    try {
      const res = await privateInstance.get(ADS_URL_USER.GET_ADS);
      console.log(res);
      setAds(res?.data?.data?.ads || []);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAds();
  }, []);

  return (
    <Box component="section" sx={{ px: 2, py: 3, color: "#152C5B" }}>
      <Typography variant="h6" sx={{ fontFamily: 'Poppins', fontWeight: 500, fontSize: "24px", mb: 3 }}>
        Ads
      </Typography>

      <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: "space-between", gap: 2 }}>
        {loading ? (
          <Typography>Loading...</Typography>
        ) : (
          ads.slice(0, 4).map((ad) => (
            <Box key={ad._id} sx={{ width: 280, cursor: "pointer" }}>
              <Box sx={{ position: 'relative', borderRadius: 3, overflow: 'hidden' }}>
                {ad.room.discount && (
                  <Chip
                    label={`${ad.room.discount}% OFF`}
                    sx={{
                      position: 'absolute',
                      top: 0,
                      right: 0,
                      fontSize: '12px',
                      backgroundColor: '#FF498B',
                      color: 'white',
                      zIndex: 1,
                      borderRadius: "0 5px 0 15px"
                    }}
                  />
                )}
                <CardMedia
                  component="img"
                  height="160"
                  image={ad.room.images && ad.room.images.length > 0 ? ad.room.images[0] : '/fallback-image.png'}
                  alt={ad.room.roomNumber || "Room Image"}
                  sx={{ borderRadius: 3, objectFit: 'cover' }}
                />
              </Box>
              <Box sx={{ mt: 1 }}>
                <Typography sx={{ fontWeight: 500 }}>
                  {ad.room.roomNumber}
                </Typography>
                <Typography sx={{ color: 'gray', fontSize: '14px' }}>
                  ${ad.room.price} per night
                </Typography>
              </Box>
            </Box>
          ))
        )}
      </Box>
    </Box>
  );
}
