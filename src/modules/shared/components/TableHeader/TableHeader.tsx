import { Box, Grid, Typography, Button, useTheme } from '@mui/material'
import { Link } from 'react-router-dom'

interface TableHeaderProps {
  TextButton?: string;
  HeaderText?: string;
  onClick?: () => void;
  hideButton?: boolean;
}

export default function TableHeader({
  TextButton = '',
  HeaderText = '',
  onClick,
  hideButton = false,
}: TableHeaderProps) {
  const isFacility = TextButton.toLowerCase() === 'facility'
  const isAds = TextButton === 'Ads'
  const theme = useTheme()
  return (
    <Grid
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '50px',
        marginTop: '5px',
      }}
    >
      <Box>
        <Typography variant="h5" color={theme.palette.text.primary}>
          {HeaderText} Table Details
        </Typography>
        <Typography variant="body2" color={theme.palette.text.primary}>
          You can check all details
        </Typography>
      </Box>

      {!hideButton && (
        <Box>
          {isFacility || isAds ? (
            <Button
              onClick={onClick}
              style={{
                textDecoration: 'none',
                color: 'white',
                backgroundColor: '#203FC7',
                paddingInline: '20px',
                paddingBlock: '10px',
                borderRadius: '8px',
                paddingLeft: '30px',
                paddingRight: '30px',
              }}
            >
              Add New {TextButton}
            </Button>
          ) : (
            <Link
              style={{
                textDecoration: 'none',
                color: 'white',
                backgroundColor: '#203FC7',
                paddingInline: '20px',
                paddingBlock: '10px',
                borderRadius: '8px',
              }}
              to="/dashboard/rooms/rooms-Data"
            >
              Add New {TextButton}
            </Link>
          )}
        </Box>
      )}
    </Grid>
  )
}
